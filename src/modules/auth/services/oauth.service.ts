/* eslint-disable prettier/prettier */
import { OAuth2Client } from 'google-auth-library';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/module/user.schema';


@Injectable()
export class AuthService {
    private client: OAuth2Client;

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {
        this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

    async verifyOAuthToken(token: string): Promise<any> {
        // Simulate token verification
        // Replace with actual verification with the OAuth provider
        if (token !== 'valid-token') {
          throw new UnauthorizedException('Invalid OAuth token');
        }
        // Simulate payload from OAuth provider
        return {
          email: 'user@example.com',
          name: 'John Doe',
          oauthProvider: 'google',
          oauthId: '1234567890',
        };
      }
    
      async validateUser(payload: any): Promise<User> {
        let user = await this.userService.findByOAuthId(payload.oauthId);
    
        if (!user) {
          user = await this.userService.create({
            email: payload.email,
            name: payload.name,
            oauthProvider: payload.oauthProvider,
            oauthId: payload.oauthId,
          });
        }
    
        return user;
      }
    
      async login(user: User): Promise<{ accessToken: string }> {
        const payload = { email: user.email, sub: user._id };
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }

}