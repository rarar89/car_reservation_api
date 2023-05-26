export enum CarMake {
  AlfaRomeo = 'Alfa Romeo',
  Audi = 'Audi',
  BMW = 'BMW',
  Bentley = 'Bentley',
  Cadillac = 'Cadillac',
  Chevrolet = 'Chevrolet',
  Other = 'Other',
}

export interface Car {
  id?: string;
  make: CarMake;
}
