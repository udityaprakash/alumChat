/* eslint-disable prettier/prettier */
// src/common/interceptors/response.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    // UnauthorizedException,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { map, catchError } from 'rxjs/operators';
  import { Response } from '../interfaces/response.interface';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  
  @Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers['authorization']?.split(' ')[1] || null;
    let sessionActive = false;

    if (authToken) {
      try {
        this.jwtService.verify(authToken, {
          secret: this.configService.get<string>('JWT_SECRET'),
        }).then(() => {
            sessionActive = true;
            }).catch(() => {
            sessionActive = false;
            });
      } catch (error) {
        sessionActive = false;
      }
    } else {
      sessionActive = false;
    }

    return next.handle().pipe(
        map((data) => {
            if (!sessionActive) {
                return {
                  errorMsg: 'Session has expired. Please log in again.',
                  success: false,
                  data: null,
                  sessionActive: false,
                } as Response<T>;
              }
            //added for remembering that If data is already wrapped, just return it
            if (data && data.success !== undefined && data.errorMsg !== undefined && data.sessionActive !== undefined) {
              return data;
            }
            // Otherwise, wrap it
            return {
              errorMsg: null,
              success: true,
              data,
              sessionActive,
            };
          }),
      catchError((err) => {
        return throwError(() => ({
          errorMsg: err.message,
          success: false,
          data: null,
          sessionActive,
        }) as Response<T>);
      }),
    );
  }
}
  
