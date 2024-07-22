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
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  //Logic to create new user
  async createUser(payload: createUserDto) {
    const { email, password, ...remainder } = payload; //Destructuring payload
    const isUser = await this.userRepo.findOne({ where: { email } }); //checking if email already exist in database
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
    const passwordMatch = await bcrypt.compare(password, isUser.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong password');
    }
    const token = await this.jwtService.signAsync(payload);
    return {
      message: `Logged in Successfully`,
      userDetails: isUser,
      userToken: token,
    };
  }
}
