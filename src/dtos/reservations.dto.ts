import { IsString, IsNotEmpty, IsDate, Length } from 'class-validator';

export class CreateReservation {
  @Length(10)
  @IsString()
  @IsNotEmpty()
  public carId: string;

  @IsNotEmpty()
  @IsString()
  public dateFrom: Date;

  @IsNotEmpty()
  @IsString()
  public dateTo: Date;
}
