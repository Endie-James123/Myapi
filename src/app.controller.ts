import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './Entities/user.entity';
import { createUserDto } from './Dtos/create.dto';
import { LoginUserDto } from './Dtos/Login.dto';

@Controller('Myapi')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('NewUser')
  async createUser(@Body() payload:createUserDto){
    return await this.appService.createUser(payload)
  }

  @Post('LoginUser')
  async Login(@Body() payload:LoginUserDto){
    return await this.appService.LoginUser(payload)
  }


}
