import { IsString, IsNotEmpty, IsDate, Length } from 'class-validator';

export class CreateReservation {
  @Length(10)
  @IsString()
  @IsNotEmpty()
  public carId: string;

  @IsNotEmpty()
  @IsDate()
  public dateFrom: Date;

  @IsNotEmpty()
  @IsDate()
  public dateTo: Date;
}
