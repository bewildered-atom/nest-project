import { IsNotEmpty, MinLength, IsEmail } from "class-validator";

export class UserSignInDTO {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}
