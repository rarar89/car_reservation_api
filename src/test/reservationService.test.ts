import { HttpException } from '@/exceptions/httpException';
import { ReservationService } from '@/services/reservation.service';
import { ReservationModel } from '@/models/reservations.model';

// Mock ReservationModel
jest.mock('@/models/reservations.model', () => {
  return {
    __esModule: true,
    default: [{ dateFrom: new Date(Date.now() + 1000000) }, { dateFrom: new Date(Date.now() - 1000000) }],
  };
});

// Mock UUID generator
jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => 'test-uuid'),
  };
});

describe('TEST ReservationService', () => {
  let service: ReservationService;

  beforeEach(() => {
    service = new ReservationService();
  });

  describe('getUpcomingReservations', () => {
    it('should return only future reservations', async () => {
      const upcomingReservations = await service.getUpcomingReservations();

      // This assertion is based on the mock data above. Modify as per your actual data structure.
      expect(upcomingReservations).toEqual([{ dateFrom: new Date(Date.now() + 1000000) }]);
    });
  });

  describe('addReservation', () => {
    const validReservation = {
      carId: 'test-car-id',
      dateFrom: new Date(Date.now() + 3600000), // 1 hour from now
      dateTo: new Date(Date.now() + 7200000), // 2 hours from now
    };

    it('should add a reservation successfully', async () => {
      const newReservation = await service.addReservation(validReservation);

      expect(newReservation).toHaveProperty('id', 'test-uuid');
      expect(newReservation).toHaveProperty('dateCreated');
      expect(ReservationModel.push).toHaveBeenCalledWith(newReservation);
    });

    it('should throw an exception when dateFrom >= dateTo', async () => {
      const invalidReservation = {
        ...validReservation,
        dateTo: validReservation.dateFrom,
      };

      await expect(service.addReservation(invalidReservation)).rejects.toThrow(HttpException);
    });
  });
});
