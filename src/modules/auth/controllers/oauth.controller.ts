/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { OAuthService } from '../services/oauth.service';
import { GoogleSigninDto } from '../dtos/signin-via-google.dto';

@Controller('oauth/login')
export class AuthenticationController {
    constructor(private readonly oAuthService: OAuthService) {}

    @Post('login')
  async googleSignin(@Body() googleSigninDto: GoogleSigninDto) : {success:boolean, token: string} {
    const { oauthToken } = googleSigninDto;
    const user = await this.authentiactionService.oauthLogin(oauthToken);
    return {
        success: true,
        token: user.token,
    };
  }

}