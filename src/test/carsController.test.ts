import request from 'supertest';
import { App } from '@/app';
import { Car, CarMake } from '@/interfaces/cars.interface';
import { CarModel } from '@/models/cars.model';
import { CarsRoute } from '@/routes/cars.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('TEST Car API', () => {
  const route = new CarsRoute();
  const app = new App([route]);

  describe('[GET] /car', () => {
    it('response statusCode 200 /findAll', () => {
      const cars: Car[] = CarModel;

      return request(app.getServer()).get(`${route.path}`).expect(200, cars);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response statusCode 200 /findOne', () => {
      const carId = 'C12311441';
      const car: Car = CarModel.find(car => car.id === carId);

      return request(app.getServer()).get(`${route.path}/${carId}`).expect(200, car);
    });
  });

  describe('[POST] /car', () => {
    it('response should have the Create userData', () => {
      const carData: Car = {
        make: CarMake.Cadillac,
      };

      return request(app.getServer()).post('/signup').send(carData).expect(201);
    });
  });
});
