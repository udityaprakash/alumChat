import { Module } from '@nestjs/common';
import { ChatGateway } from './controllers/chatgateway.controller';
import { ChatService } from './services/chat.service';

@Module({
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
