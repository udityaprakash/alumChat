import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { success: string } {
    return { success: 'Welcome to alumChat!' };
  }
}
