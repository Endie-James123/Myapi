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
    if (isUser) {//If email exist in database......
      throw new HttpException('User with this email already exist', 400);//Throw HttpException
    }//else.....
    const hashPassword = await bcrypt.hash(password, 10);//Declare variable to store hashedPassword
    const user = await this.userRepo.create({//create user with...
      email,//this email
      password: hashPassword,//Assign hashed password to user's password
      ...remainder,//remaining stuffs in the payload
    });
    return await this.userRepo.save(user);//Finally return created user
  }

  //Route to Login already existing user
  async LoginUser(payload: LoginUserDto) {
    const { email, password } = payload;//Destructuring payload
    const isUser = await this.userRepo.findOne({ where: { email } });//Look for the user's email in the database
    if (!isUser) {//If it doesn't exist.....
      throw new HttpException('User With this email does not exist', 404);//Throw HttpException
    }//else.....
    const passwordMatch = await bcrypt.compare(password, isUser.password);//Use Bcrypt to compare user's password
    if (!passwordMatch) {//If it doesn't matches.....
      throw new UnauthorizedException('Wrong password');//Through Unauthorised exception
    }
    const token = await this.jwtService.signAsync(payload);//Generate Jwt token and assign it to user's payload
    return {
      message: `Logged in Successfully`,//Message to return
      userDetails: isUser,//Return user details
      userToken: token,//Also return user's token
    };
  }
}
