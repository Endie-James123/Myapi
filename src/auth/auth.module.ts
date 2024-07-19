import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports:[
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            useFactory:(configService:ConfigService) => ({
                secret: configService.getOrThrow<string>('JWT_SECRET'),
                signOptions:{
                    expiresIn: configService.getOrThrow('JWT_EXPIRES_IN')
                }
            }),
            inject:[ConfigService],
        })
    ],
    exports:[JwtModule]
})
export class AuthModule {}
