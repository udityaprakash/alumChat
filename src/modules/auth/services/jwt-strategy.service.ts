/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { JwtPayload } from '../interfaces/jwtpayload.interface';
import { AuthService } from './oauth.service';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // async validate(payload: JwtPayload) {
  //   const user = await this.authService.validateUser(payload);
  //   if (!user) {
  //     throw new UnauthorizedException("Invalid token");
  //   }
  //   return user;
  // }
}
