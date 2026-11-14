import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  message!: string;
}
