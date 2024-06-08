import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './Entities/user.entity';

@Controller('Myapi')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
}
