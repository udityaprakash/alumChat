/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from 'src/modules/chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/module/user.module';

@Module({
  imports: [
    ChatModule,
    MongooseModule.forRoot('mongodb://localhost/nest'), 
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
