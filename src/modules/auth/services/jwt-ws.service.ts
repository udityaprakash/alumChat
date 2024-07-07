/* eslint-disable prettier/prettier */
// src/auth/jwt-ws.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { JwtWsErrorDto } from 'src/modules/chat/dtos/jwtws.dto';

@Injectable()
export class JwtWsGuard extends AuthGuard('jwt') {

  constructor(private jwtService: JwtService) {
      super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const authToken = client.handshake?.headers?.token;
    if (!authToken) {
      client.emit('error', { message: 'Authorization token is missing' });
      throw new WsException('Autherization token is missing');
    }
    try {
        const payload = await this.jwtService.verifyAsync(authToken, {
          secret: '4567',
        });
        client.handshake.headers['user'] = payload;
      } catch(err) {
        const errorResponse = new JwtWsErrorDto('Invalid Token or token is expired');
        client.emit('error', errorResponse);
        throw new WsException("Invalid Token or token is expired");
      }
      return true;
  }

  error(): JwtWsErrorDto{
    return 
  }

//   handleRequest(err:any, user:any) {
//     if (err || !user) {
//       throw err || new WsException('Unauthorized');
//     }
//     return user;
//   }
}
