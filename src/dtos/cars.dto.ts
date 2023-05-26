import { CarMake } from '@/interfaces/cars.interface';
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsEnum } from 'class-validator';

export class CreateCarDto {
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
