import { HttpException } from '@/exceptions/httpException';
import { Reservation } from '@/interfaces/reservations.interface';
import { ReservationModel } from '@/models/reservations.model';
import { Service } from 'typedi';
import { v4 as uuid } from 'uuid';

const MAX_RESERVE_TIME = 60 * 60 * 2;
const MAX_AHEAD_TIME = 60 * 60 * 24;

@Service()
export class ReservationService {
  public reservation = ReservationModel;

  public async getUpcomingReservations(): Promise<Reservation[]> {
    const dateNow = new Date();

    return this.reservation.filter(c => c.dateFrom.getTime() > dateNow.getTime());
  }

  public async addReservation(data: Reservation): Promise<Reservation> {
    const dateNow = new Date();

    await this.validateReservation(data);

    const newReservation = {
      ...{
        id: uuid(),
        dateCreated: dateNow,
      },
      ...data,
    };

    this.reservation.push(newReservation);
    return newReservation;
  }

  protected async validateReservation(data: Reservation) {
    const dateNowMs = new Date().getTime();
    const dateFromMs = data.dateFrom.getTime();
    const dateToMs = data.dateTo.getTime();

    if (dateFromMs >= dateToMs) {
      throw new HttpException(400, 'Reservation starting date cannot be larger or equal to ending date');
    }

    if (dateFromMs / 1000 - dateNowMs / 1000 > MAX_AHEAD_TIME) {
      throw new HttpException(400, `Reservation can be made only ${MAX_AHEAD_TIME / 60 / 60} hours ahead`);
    }

    if (dateToMs / 1000 - dateFromMs / 1000 > MAX_RESERVE_TIME) {
      throw new HttpException(400, `Reservation can be made maximum for only ${MAX_RESERVE_TIME / 60 / 60} hours`);
    }

    if (dateToMs < dateNowMs || dateFromMs < dateNowMs) {
      throw new HttpException(400, `Reservation cannot be made in the past`);
    }

    if (await this.isReserved(data.carId, data.dateFrom, data.dateTo)) {
      throw new HttpException(400, `Reservation slot is already taken`);
    }
  }

  protected async isReserved(carId: string, dateFrom: Date, dateTo: Date): Promise<boolean> {
    const dateFromTime = dateFrom.getTime();
    const dateToTime = dateTo.getTime();

    const takenCar = this.reservation.filter(
      c =>
        c.carId === carId &&
        ((c.dateFrom.getTime() <= dateFromTime && dateFromTime <= c.dateTo.getTime()) ||
          (c.dateFrom.getTime() <= dateToTime && dateToTime <= c.dateTo.getTime())),
    );

    return takenCar.length > 0;
  }
}
