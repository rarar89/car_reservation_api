import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ReservationService } from '@/services/reservation.service';
import { Reservation } from '@/interfaces/reservations.interface';

export class ReservationController {
  public reservations = Container.get(ReservationService);

  public getReservations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allReservations: Reservation[] = await this.reservations.getUpcomingReservations();

      res.status(200).json(allReservations);
    } catch (error) {
      next(error);
    }
  };

  public createCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: Reservation = req.body;
      const createdData: Reservation = await this.reservations.addReservation(data);

      res.status(201).json(createdData);
    } catch (error) {
      next(error);
    }
  };
}
