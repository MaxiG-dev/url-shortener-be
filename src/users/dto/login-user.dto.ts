import { IsString, IsEmail, IsStrongPassword } from "class-validator";

export class LoginUserDTO {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword()
    password: string;
}