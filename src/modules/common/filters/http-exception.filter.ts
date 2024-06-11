/* eslint-disable prettier/prettier */
// src/common/filters/http-exception.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from '../interfaces/response.interface';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      // const request = ctx.getRequest();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const responsePayload: Response<null> = {
        errorMsg: (exception as any).message,
        success: false,
        data: null,
        sessionActive: false,
      };
  
      response.status(status).json(responsePayload);
    }
  }
  