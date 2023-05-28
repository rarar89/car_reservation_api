import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CreateCarDto, UpdateCarDto } from '@/dtos/cars.dto';
import { ReservationController } from '@/controllers/reservations.controller';
import { CreateReservation } from '@/dtos/reservations.dto';

export class ReservationsRoute implements Routes {
  public path = '/reservations';
  public router = Router();
  public reservation = new ReservationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.reservation.getReservations);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateReservation), this.reservation.createReservation);
  }
}
