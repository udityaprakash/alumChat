/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from 'src/modules/chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ChatModule,
    MongooseModule.forRoot(process.env.MONGO_DB_CON_STRING), 
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
