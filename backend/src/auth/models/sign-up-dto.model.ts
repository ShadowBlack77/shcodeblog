import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}