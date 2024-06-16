/* eslint-disable prettier/prettier */
import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/interfaces/user.interface';
import { OAuthProviderEnum } from '../enums/oauth-provider.enum';
import { responseDto } from '../dtos/authentication-response.dto';
import { JwtPayload } from '../interfaces/jwtpayload.interface';


@Injectable()
export class AuthService {
    private client: OAuth2Client;

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {
        this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

    async verifyOAuthToken(token: string): Promise<JwtPayload> {
      try {
        const response : LoginTicket = await this.client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
          });
        const payload = response.getPayload();  
        return {
          email: payload.email,
          name: payload.name,
          oauthId: payload.sub,
        };
      } catch (error) {
        throw new UnauthorizedException('Exception Caught in Google token '+ error);
      }
      }
    
      async validateUser(token: string): Promise<User> {
        const payload = await this.verifyOAuthToken(token);
        let user = await this.userService.findByOAuthId(payload.oauthId);
    
        if (!user) {
          user = await this.userService.create({
            email: payload.email,
            name: payload.name,
            oauthProvider: OAuthProviderEnum.GOOGLE,
            oauthId: payload.oauthId,
          });
        }
    
        return user;
      }
    
      async login(user: User): Promise<responseDto> {
        const payload = { email: user.email, name:user.name, oauthId: user.oauthId };
        return {
          success: true,
          accessToken: this.jwtService.sign(payload),
        };
      }

}