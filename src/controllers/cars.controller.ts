import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CarService } from '@/services/car.service';
import { Car } from '@/interfaces/cars.interface';

export class CarController {
  public car = Container.get(CarService);

  public getCars = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allUserData: Car[] = await this.car.findAllCars();

      res.status(200).json(allUserData);
    } catch (error) {
      next(error);
    }
  };

  public getCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const carData: Car = await this.car.findCarById(req.params.id);

      res.status(200).json(carData);
    } catch (error) {
      next(error);
    }
  };

  public createCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: Car = req.body;
      const createdData: Car = await this.car.createCar(data);

      res.status(201).json(createdData);
    } catch (error) {
      next(error);
    }
  };

  public updateCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: Car = req.body;
      const updatedData: Car = await this.car.updateCar(req.params.id, data);

      res.status(200).json(updatedData);
    } catch (error) {
      next(error);
    }
  };

  public deleteCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.car.deleteCar(req.params.id);

      res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
}
