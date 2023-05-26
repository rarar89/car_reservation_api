import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CarController } from '@/controllers/cars.controller';
import { CreateCarDto, UpdateCarDto } from '@/dtos/cars.dto';

export class CarsRoute implements Routes {
  public path = '/cars';
  public router = Router();
  public car = new CarController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.car.getCars);
    this.router.get(`${this.path}/:id(\\d+)`, this.car.getCar);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateCarDto), this.car.createCar);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateCarDto), this.car.updateCar);
    this.router.delete(`${this.path}/:id(\\d+)`, this.car.deleteCar);
  }
}
