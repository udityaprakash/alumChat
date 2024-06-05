/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/oauth.service';
import { AuthController } from './controllers/oauth.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../auth/services/jwt-strategy.service';
import { JwtWsGuard } from '../auth/services/jwt-ws.service';

@Module({
  imports: [
    PassportModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '6h' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    UserModule,
  ],
  providers: [AuthService,JwtStrategy, JwtWsGuard],
  controllers: [AuthController],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
