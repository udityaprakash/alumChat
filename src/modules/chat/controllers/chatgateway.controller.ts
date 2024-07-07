/* eslint-disable prettier/prettier */
import {  WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect,} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';
import { MessageDto } from '../dtos/message.dto';
import { MessageSeenDto } from '../dtos/messageSeen.dto';
import { JwtWsGuard } from '../../auth/services/jwt-ws.service';
import { UseGuards } from '@nestjs/common';
import { InitiateResponseDto } from '../dtos/initiateResponse.dto';
import { CommonMessageResponseDto } from '../dtos/commonMessageResponse.dto';


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
    const response =new InitiateResponseDto({message:'successfully initiated!'});
    client.emit('initiate',response);

  }

  handleDisconnect(client: Socket): void {
    this.chatService.removeSocket(client.id);
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('message')
  handleMessage(@MessageBody() messageDto: MessageDto, @ConnectedSocket() client: Socket): void {

    const newMessage = this.chatService.createMessage(client, messageDto);
    const receiverSocketId = this.chatService.getSocketId(messageDto.receiverId);
    const senderSocketId = this.chatService.getSocketId(client.handshake.headers['user']['oauthId']);
    const response = new CommonMessageResponseDto(newMessage);

    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('message', response);
    }

    if (senderSocketId) {
      this.server.to(senderSocketId).emit('message', response);
    }
  }

  @UseGuards(JwtWsGuard)
  @SubscribeMessage('messageSeen')
  handleSeenMessage(@MessageBody() messageSeenDto: MessageSeenDto): void {
    const updatedMessage = this.chatService.markMessageAsSeen(messageSeenDto);
    const senderSocketId = this.chatService.getSocketId(updatedMessage.senderId);
    const response = new CommonMessageResponseDto(updatedMessage);
    if (senderSocketId) {
      this.server.to(senderSocketId).emit('messageSeen', response);
    }
  }
}
