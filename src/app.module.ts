import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './Database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({  
      isGlobal: true, 
    }),
    TypeOrmModule.forFeature([UserEntity]),
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
