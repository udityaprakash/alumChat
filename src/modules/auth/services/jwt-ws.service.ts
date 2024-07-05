/* eslint-disable prettier/prettier */
// src/auth/jwt-ws.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class JwtWsGuard extends AuthGuard('jwt') {

  constructor(private jwtService: JwtService) {
      super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const response = context.switchToHttp().getResponse<Response>();
    const authToken = client.handshake?.headers?.token;
    if (!authToken) {
      // throw new UnauthorizedException('Autherization token is missing');
      response.status(401).json({ message: 'Missing authorization header' });
      return false;
    }
    try {
        const payload = await this.jwtService.verifyAsync(authToken, {
          secret: '4567',
        });
        client.handshake.headers['user'] = payload;
      } catch(err) {
        console.log('error', err)
        // throw new UnauthorizedException("no auth token found");
        response.status(401).json({ message: 'no JWT token Found' });
        return false;
      }
      return true;
  }

//   handleRequest(err:any, user:any) {
//     if (err || !user) {
//       throw err || new WsException('Unauthorized');
//     }
//     return user;
//   }
}
