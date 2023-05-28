import { CarMake } from '@/interfaces/cars.interface';
import { CarService } from '@/services/car.service';

// Mock data
const mockCarData = {
  id: 'C1234567890',
  make: CarMake.BMW,
};

let carService;
let CarModel;

beforeEach(() => {
  CarModel = [
    {
      id: 'C0987654321',
      make: CarMake.Chevrolet,
    },
    {
      id: 'C1122334455',
      make: CarMake.Audi,
    },
  ];

  carService = new CarService();
  carService.car = CarModel;
});

describe('TEST CarService', () => {
  it('should get a car', async () => {
    const selectedCar = await carService.findCarById('C0987654321');

    expect(selectedCar).toEqual(CarModel[0]);
  });

  it('should create a car', async () => {
    const createdCar = await carService.createCar(mockCarData);

    expect(createdCar).toEqual(mockCarData);
    expect(CarModel).toContainEqual(mockCarData);
  });

  it('should delete a car', async () => {
    const initialLength = CarModel.length;

    const result = await carService.deleteCar('C1122334455');

    expect(result).toBe(true);
    expect(CarModel).toHaveLength(initialLength - 1);
  });

  it('should update a car', async () => {
    const updatedData = { ...mockCarData, make: CarMake.Audi };

    const updatedCar = await carService.updateCar('C0987654321', updatedData);

    expect(updatedCar).toEqual(updatedData);
    expect(CarModel.find(car => car.id === 'C1234567890')).toEqual(updatedData);
  });
});
