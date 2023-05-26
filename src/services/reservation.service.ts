import { HttpException } from '@/exceptions/httpException';
import { Reservation } from '@/interfaces/reservations.interface';
import { ReservationModel } from '@/models/reservations.model';
import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

const MAX_RESERVE_TIME = 60 * 60 * 2;
const MAX_AHEAD_TIME = 60 * 60 * 24;

@Service()
export class ReservationService {
  public async getUpcomingReservations(): Promise<Reservation[]> {
    const dateNow = new Date();

    return ReservationModel.filter(c => c.dateFrom > dateNow);
  }

  public async addReservation(data: Reservation): Promise<Reservation> {
    const dateNow = new Date();

    this.validateReservation(data);

    const newReservation = {
      ...{
        id: uuid(),
        dateCreated: dateNow,
      },
      ...data,
    };

    ReservationModel.push(newReservation);
    return newReservation;
  }

  protected async validateReservation(data: Reservation) {
    const dateNow = new Date();

    if (data.dateFrom >= data.dateTo) {
      throw new HttpException(400, 'Reservation starting date cannot be larger or equal to ending date');
    }

    if (data.dateFrom.getTime() / 1000 - dateNow.getTime() / 1000 > MAX_AHEAD_TIME) {
      throw new HttpException(400, `Reservation can be made only ${MAX_AHEAD_TIME / 60 / 60} hours ahead`);
    }

    if (data.dateTo.getTime() / 1000 - data.dateFrom.getTime() / 1000 > MAX_RESERVE_TIME) {
      throw new HttpException(400, `Reservation can be made maximum for only ${MAX_RESERVE_TIME / 60 / 60} hours`);
    }

    if (await this.isReserved(data.carId, data.dateFrom, data.dateTo)) {
      throw new HttpException(400, `Reservation slot is already taken`);
    }
  }

  protected async isReserved(carId: string, dateFrom: Date, dateTo: Date): Promise<boolean> {
    const takenCar = ReservationModel.filter(
      c => c.carId === carId && ((c.dateFrom > dateFrom && dateFrom < c.dateTo) || (c.dateFrom > dateTo && dateTo < c.dateTo)),
    );

    return takenCar.length > 0;
  }
}
