import { Injectable } from '@nestjs/common';
import { Message } from '../interfaces/chatmessage.interface';
import { MessageDto } from '../dtos/message.dto';
import { MessageSeenDto } from '../dtos/messageSeen.dto';
import { v4 as uuidv4 } from 'uuid';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  private messages: Message[] = [];
  private userSocketMap: { [userId: string]: string } = {};

  registerSocket(userId: string, socketId: string): void {
    this.userSocketMap[userId] = socketId;
  }

  removeSocket(socketId: string): void {
    for (const userId in this.userSocketMap) {
      if (this.userSocketMap[userId] === socketId) {
        delete this.userSocketMap[userId];
        break;
      }
    }
  }

  getSocketId(userId: string): string | undefined {
    return this.userSocketMap[userId];
  }

  getAllMessages(): Message[] {
    return this.messages;
  }

  getMessageById(id: string): Message {
    return this.messages.find((msg) => msg.id === id);
  }

  createMessage(client: Socket, messageDto: MessageDto): Message {
    const { receiverId, message } = messageDto;
    const newMessage: Message = {
      id: uuidv4(),
      senderId: client.handshake.headers['user']['oauthId'],
      receiverId: receiverId,
      message: message,
      timestamp: new Date(),
      seen: false,
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  markMessageAsSeen(messageSeenDto: MessageSeenDto): Message {
    const { messageId, receiverId } = messageSeenDto;
    const message = this.messages.find(
      (msg) => msg.id === messageId && msg.senderId === receiverId,
    );
    if (message) {
      message.seen = true;
    }
    return message;
  }
}
