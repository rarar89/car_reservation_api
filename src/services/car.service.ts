import { HttpException } from '@/exceptions/httpException';
import { Car, ID_NR_LEN } from '@/interfaces/cars.interface';
import { CarModel } from '@/models/cars.model';
import { generateNumber } from '@/utils/number';
import { Service } from 'typedi';

@Service()
export class CarService {
  public car = CarModel;

  public async findAllCars(): Promise<Car[]> {
    return this.car;
  }

  public async findCarById(id: string): Promise<Car> {
    const data = this.car.find((car: Car) => car.id === id);

    if (!data) {
      throw new HttpException(404, 'Car not found');
    }

    return data;
  }

  public async createCar(data: Car): Promise<Car> {
    if (!data.id) {
      data.id = this.generateId();
    } else if (!this.validateId(data.id)) {
      throw new HttpException(400, 'Incorrect car id provided');
    }

    const existingCar = this.car.find((car: Car) => car.id === data.id);
    if (existingCar) {
      throw new HttpException(409, 'Car with a given id already exists');
    }

    this.car.push(data);

    return data;
  }

  public async deleteCar(id: string): Promise<boolean> {
    const carIndx = this.car.findIndex((car: Car) => car.id === id);

    if (carIndx < 0) {
      throw new HttpException(404, 'Car not found');
    }

    this.car.splice(carIndx, 1);

    return true;
  }

  public async updateCar(id: string, data: Car): Promise<Car> {
    const carIndx = this.car.findIndex((car: Car) => car.id === id);

    if (carIndx < 0) {
      throw new HttpException(404, 'Car not found');
    }

    if (!this.validateId(data.id)) {
      throw new HttpException(400, 'Incorrect car id provided');
    }

    const existingCarIndx = this.car.findIndex((car: Car) => car.id === id);
    if (existingCarIndx && existingCarIndx !== carIndx) {
      throw new HttpException(409, 'Car with a given id already exists');
    }

    this.car[carIndx] = data;

    return data;
  }

  protected generateId(): string {
    return 'C' + generateNumber(ID_NR_LEN);
  }

  protected async validateId(input: string): Promise<boolean> {
    const pattern = new RegExp('^C\\d{' + ID_NR_LEN + '}$');
    if (!pattern.test(input)) {
      return false;
    }

    return true;
  }
}
