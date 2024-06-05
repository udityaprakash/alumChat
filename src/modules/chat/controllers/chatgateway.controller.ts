/* eslint-disable prettier/prettier */
import {  WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect,} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';
import { MessageDto } from '../dtos/message.dto';
import { MessageSeenDto } from '../dtos/messageSeen.dto';
import { JwtWsGuard } from '../../auth/services/jwt-ws.service';
import { UseGuards } from '@nestjs/common';


@WebSocketGateway({port:4001, namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() 
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('initiate')
  handleRegister(@ConnectedSocket() client: Socket): void {
    this.chatService.registerSocket(client.handshake.headers['user']['oauthId'], client.id);
  }

  handleDisconnect(client: Socket): void {
    this.chatService.removeSocket(client.id);
  }

  @UseGuards(JwtWsGuard)
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

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('messageSeen')
  handleSeenMessage(@MessageBody() messageSeenDto: MessageSeenDto): void {
    const updatedMessage = this.chatService.markMessageAsSeen(messageSeenDto);
    const senderSocketId = this.chatService.getSocketId(updatedMessage.senderId);

    if (senderSocketId) {
      this.server.to(senderSocketId).emit('messageSeen', updatedMessage);
    }
  }
}
