import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor, UploadedFile, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { S3Service } from 'src/aws/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private s3Service: S3Service) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@Request() req) {
      const user = await this.usersService.findOneByEmail(req.user.email);
      user.profileImg = await this.s3Service.getSignedUrl(user.profileImg);
      return user;
  }

  @UseGuards(AuthGuard)
  @Patch('picture')
  @UseInterceptors(FileInterceptor('profileImg'))
  async updateProfileImg(@Request() req, @UploadedFile() profileImg: Express.Multer.File) {
    const uploadedImg = await this.s3Service.uploadToS3(profileImg);
    await this.usersService.update(req.user.id, { profileImg: uploadedImg });
    return { success: true, message: 'User profile image updated!' };
  }
}
