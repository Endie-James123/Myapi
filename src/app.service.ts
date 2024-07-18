import {
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from './Entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './Dtos/create.dto';
import { LoginUserDto } from './Dtos/Login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async createUser(payload: createUserDto) {
    const { email, password, ...remainder } = payload;
    const isUser = await this.userRepo.findOne({ where: { email } });
    if (isUser) {
      throw new HttpException('User with this email already exist', 400);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepo.create({
      email,
      password: hashPassword,
      ...remainder,
    });
    return await this.userRepo.save(user);
  }

  async LoginUser(payload: LoginUserDto) {
    const { email, password } = payload;
    const isUser = await this.userRepo.findOne({ where: { email } });
    if (!isUser) {
      throw new HttpException('User With this email does not exist', 404);
    }
    if (isUser.password != password) {
      throw new UnauthorizedException('Wrong password');
    }
    return {
      message: `${isUser.usernname} Logged in Successfully`,
    };
  }
}
