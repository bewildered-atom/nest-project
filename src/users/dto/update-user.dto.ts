import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateProfileImage extends PickType(CreateUserDto, ['profileImg']) {}

export class UpdateUserPassword {
    @IsNotEmpty()
    @MinLength(6)
    readonly old_password: string;


    @IsNotEmpty()
    @MinLength(6)
    readonly new_password: string;
}