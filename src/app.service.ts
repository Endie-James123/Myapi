import { Injectable } from '@nestjs/common';
import { UserEntity } from './Entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './Dtos/create.dto';

@Injectable()
export class AppService {
  constructor(@InjectRepository(UserEntity) private userRepo:Repository<UserEntity>){}

  async createUser(payload:createUserDto){
    const user = await this.userRepo.create(payload);
    return await this.userRepo.save(user)
  }

  LoginUser(payload){
    
  }


}
 