import { IsNotEmpty, MinLength, IsEmail, IsEnum, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsOptional()
    readonly profileImg?: string;
}
