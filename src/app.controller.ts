import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './Entities/user.entity';
import { createUserDto } from './Dtos/create.dto';
import { LoginUserDto } from './Dtos/Login.dto';

@Controller('Myapi')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Route to create new user
  @Post('createUser')
  async createUser(@Body() payload:createUserDto){
    return await this.appService.createUser(payload)
  }

  //Route to login already existing user
  @Post('LoginUser')
  async Login(@Body() payload:LoginUserDto){
    return await this.appService.LoginUser(payload)
  }


}
