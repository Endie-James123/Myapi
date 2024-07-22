import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './Database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({  
      isGlobal: true, 
    }),
    TypeOrmModule.forFeature([UserEntity]),
    DatabaseModule,
    AuthModule,
    JwtModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
/* A JSON Web token (JWT) is simply a small, secure token used to verify a user's
identity. It contains 3 parts, the header, the payload with the users information,
and a signature to ensure the tokens integrity or validity */