import { HttpException } from '@/exceptions/httpException';
import { Car, ID_NR_LEN } from '@/interfaces/cars.interface';
import { CarModel } from '@/models/cars.model';
import { generateNumber } from '@/utils/number';
import { Service } from 'typedi';

@Service()
export class CarService {
  public async findAllCars(): Promise<Car[]> {
    return CarModel;
  }

  public async findCarById(id: string): Promise<Car> {
    return CarModel.find((car: Car) => car.id === id);
  }

  public async createCar(data: Car): Promise<Car> {
    if (!data.id) {
      data.id = this.generateId();
    } else if (!this.validateId(data.id)) {
      throw new HttpException(400, 'Incorrect car id provided');
    }

    CarModel.push(data);

    return data;
  }

  public async deleteCar(id: string): Promise<boolean> {
    const carIndx = CarModel.findIndex((car: Car) => car.id === id);

    if (carIndx < 0) {
      throw new HttpException(404, 'Car not found');
    }

    CarModel.splice(carIndx, 1);

    return true;
  }

  public async updateCar(id: string, data: Car): Promise<Car> {
    let carToUpdate = await this.findCarById(id);

    if (!carToUpdate) {
      throw new HttpException(404, 'Car not found');
    }

    if (!this.validateId(data.id)) {
      throw new HttpException(400, 'Incorrect car id provided');
    }

    carToUpdate = data;

    return carToUpdate;
  }

  protected generateId(): string {
    return 'C' + generateNumber(ID_NR_LEN);
  }

  protected async validateId(input: string): Promise<boolean> {
    const pattern = new RegExp('^C\\d{' + (ID_NR_LEN + 1) + '}$');
    if (!pattern.test(input)) {
      return false;
    }

    const existingCar = await this.findCarById(input);

    return !existingCar;
  }
}
