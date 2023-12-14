import { Body, Controller, Post, HttpCode, HttpStatus, UseInterceptors, ClassSerializerInterceptor, UploadedFile, ParseFilePipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { profileImgValidator } from "src/validators/file-upload.validator";
import { S3Service } from "src/aws/s3.service";
import { UserSignInDTO } from "src/users/dto/user-sign-in.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private s3Service: S3Service
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() createUserDto: UserSignInDTO) {
        return this.authService.signIn(createUserDto.email, createUserDto.password);
    }

    @Post('signup')
    @UseInterceptors(FileInterceptor('profileImg'))
    @UseInterceptors(ClassSerializerInterceptor)
    async signUp(@Body() user: CreateUserDto, @UploadedFile(new ParseFilePipe({ validators: profileImgValidator })) profileImg: Express.Multer.File) {
        const uploadedImg = (profileImg && await this.s3Service.uploadToS3(profileImg)) || '';
        const newuser = await this.authService.signUp({ ...user, profileImg: uploadedImg || ''});
        const profileImgUrl = await this.s3Service.getSignedUrl(uploadedImg)
        return { ...newuser, profileImg: profileImgUrl }
    }
}