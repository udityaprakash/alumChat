/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/oauth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('token') token: string) {
    try {
      const payload = await this.authService.verifyOAuthToken(token);
      const user = await this.authService.validateUser(payload);
      return this.authService.login(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
