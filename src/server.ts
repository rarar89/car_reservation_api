import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { CarsRoute } from './routes/cars.route';
import { ReservationsRoute } from './routes/reservations.route';

ValidateEnv();

const app = new App([new CarsRoute(), new ReservationsRoute()]);

app.listen();
