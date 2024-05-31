/* eslint-disable prettier/prettier */
import {  WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';
import { MessageDto } from '../dtos/message.dto';
import { MessageSeenDto } from '../dtos/messageSeen.dto';


@WebSocketGateway({port:4006, namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer() 
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('initiate')
  handleRegister(@ConnectedSocket() client: Socket, @MessageBody() data: { userId: string }): void {
    this.chatService.registerSocket(data.userId, client.id);
  }

  handleDisconnect(client: Socket): void {
    this.chatService.removeSocket(client.id);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() messageDto: MessageDto): void {

    const newMessage = this.chatService.createMessage(messageDto);
    const receiverSocketId = this.chatService.getSocketId(messageDto.receiverId);
    const senderSocketId = this.chatService.getSocketId(messageDto.senderId);

    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('message', newMessage);
    }

    if (senderSocketId) {
      this.server.to(senderSocketId).emit('message', newMessage);
    }
  }

  @SubscribeMessage('messageSeen')
  handleSeenMessage(@MessageBody() messageSeenDto: MessageSeenDto): void {
    const updatedMessage = this.chatService.markMessageAsSeen(messageSeenDto);
    const senderSocketId = this.chatService.getSocketId(updatedMessage.senderId);

    if (senderSocketId) {
      this.server.to(senderSocketId).emit('messageSeen', updatedMessage);
    }
  }
}
