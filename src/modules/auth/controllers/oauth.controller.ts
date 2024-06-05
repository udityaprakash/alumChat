/* eslint-disable prettier/prettier */
import { Controller,Get, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/oauth.service';
import { responseDto } from '../dtos/authentication-response.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  test(){
    return {success:true}
  }

  @Post('login')
  async login(@Body('token') token: string): Promise<responseDto>{
      const user = await this.authService.validateUser(token);
      return await this.authService.login(user);
  }
}
