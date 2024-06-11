import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './Entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './Dtos/create.dto';
import { LoginUserDto } from './Dtos/Login.dto';

@Injectable()
export class AppService {
  constructor(@InjectRepository(UserEntity) private userRepo:Repository<UserEntity>){}

  async createUser(payload:createUserDto){
    const user = await this.userRepo.create(payload);
    return await this.userRepo.save(user)
  }

  async LoginUser(payload:LoginUserDto){
    const {email, password } = payload
    const isUser = await this.userRepo.findOne({where:{email}})
    if (isUser.password != password ){
      throw new UnauthorizedException('Wrong password')
    }
    return {
      message: `${isUser.usernname} Logged in Successfully`
    }
  }


}
 