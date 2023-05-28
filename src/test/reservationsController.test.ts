import request from 'supertest';
import { App } from '@/app';
import { ReservationsRoute } from '@/routes/reservations.route';

jest.mock('@/models/reservations.model', () => {
  return {
    ReservationModel: [
      { dateFrom: new Date(Date.now() + 1000000), dateTo: new Date(Date.now() + 2000000), carId: 'C123456789' },
      { dateFrom: new Date(Date.now() - 1000000), dateTo: new Date(Date.now() - 500000), carId: 'C123456799' },
    ],
  };
});

describe('TEST Reservation API', () => {
  const route = new ReservationsRoute();
  const app = new App([route]);

  describe('[GET] /reservations', () => {
    it('response statusCode 200 /findAll', () => {
      return request(app.getServer())
        .get(`${route.path}`)
        .expect(200)
        .expect(res => {
          if (!('carId' in res.body[0]) || res.body[0].carId !== 'C123456789') {
            throw new Error('Invalid carId');
          }

          if (res.body.length !== 1) {
            throw new Error('Invalid amount of reservations returned');
          }
        });
    });
  });
});
