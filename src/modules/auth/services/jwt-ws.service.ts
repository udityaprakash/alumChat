/* eslint-disable prettier/prettier */
// src/auth/jwt-ws.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
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
      const errorResponse = new JwtWsErrorDto('Authorization token is missing',true);
      client.emit('error', errorResponse);
      return false;
    }
    try {
        const payload = await this.jwtService.verifyAsync(authToken, {
          secret: '4567',
        });
        client.handshake.headers['user'] = payload;
      } catch(err) {
        const errorResponse = new JwtWsErrorDto('Invalid Token or token is expired',true);
        client.emit('error', errorResponse);
        return false;
      }
      return true;
  }
}
