import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  create(user: CreateUserDto) {
    return this.userModel.create(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return this.userModel.findOne({ where: { id }});
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ where: { email }});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, { where: { id }, logging: true });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
