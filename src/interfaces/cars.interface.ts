export enum CarMake {
  AlfaRomeo = 'AlfaRomeo',
  Audi = 'Audi',
  BMW = 'BMW',
  Bentley = 'Bentley',
  Cadillac = 'Cadillac',
  Chevrolet = 'Chevrolet',
  Other = 'Other',
}

export const ID_NR_LEN = 9;

export interface Car {
  id?: string;
  make: CarMake;
}
