import { CarMake, ID_NR_LEN } from '@/interfaces/cars.interface';
import { IsNotEmpty, IsEnum, Length } from 'class-validator';

export class CreateCarDto {
  @Length(ID_NR_LEN + 1)
  public id?: string;
  @IsNotEmpty()
  @IsEnum(CarMake)
  public make: CarMake;
}

export class UpdateCarDto {
  public id?: string;
  @IsNotEmpty()
  @IsEnum(CarMake)
  public make: CarMake;
}
