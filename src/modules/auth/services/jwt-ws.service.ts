/* eslint-disable prettier/prettier */
// src/auth/jwt-ws.guard.ts
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtWsGuard extends AuthGuard('jwt') {

  constructor(private jwtService: JwtService) {
      super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const authToken = client.handshake?.headers?.token;
    if (!authToken) {
      throw new UnauthorizedException('Autherization token is missing');
    }
    try {
        console.log( 'authToken', authToken)
        const payload = await this.jwtService.verifyAsync(authToken, {
          secret: '4567',
        });
        console.log('payload',payload)
        client.handshake.headers['user'] = payload;
      } catch(err) {
        console.log('error', err)
        throw new UnauthorizedException("no auth token found");
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
