import request from 'supertest';
import { App } from '@/app';
import { ReservationsRoute } from '@/routes/reservations.route';
import { Reservation } from '@/interfaces/reservations.interface';
import { ReservationModel } from '@/models/reservations.model';

const dateFromFirst = new Date(Date.now() + 1000000);

// Mock ReservationModel
jest.mock('@/models/reservations.model', () => {
  return {
    default: [{ dateFrom: dateFromFirst }, { dateFrom: new Date(Date.now() - 1000000) }],
  };
});

describe('TEST Reservation API', () => {
  const route = new ReservationsRoute();
  const app = new App([route]);

  describe('[GET] /reservations', () => {
    it('response statusCode 200 /findAll', () => {
      return request(app.getServer()).get(`${route.path}`).expect(200), [{ dateFrom: dateFromFirst }];
    });
  });
});
