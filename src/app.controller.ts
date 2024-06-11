import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './Entities/user.entity';
import { createUserDto } from './Dtos/create.dto';

@Controller('Myapi')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('NewUser')
  createUser(@Body() payload:createUserDto){

  }

}
