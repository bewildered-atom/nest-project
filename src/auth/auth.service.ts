import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { jwtConstants } from './constants';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, pass) {
    const user = await this.usersService.findOneByEmail(email);
    if (user?.email !== email || !await compare(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.generateToken(payload),
    };
  }

  async signUp(user) {
    const hashedPass = await hash(user.password, 2);
    const newUser = await this.usersService.create({ ...user, password: hashedPass });
    return {
      ...classToPlain(newUser) ,
      access_token: await this.generateToken({ sub: newUser.id, email: newUser.email }),
    }
  }

  private generateToken(payload) {
    return this.jwtService.signAsync(payload, { secret: jwtConstants.secret, expiresIn: '15m' })
  }
}