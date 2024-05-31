import { IsString } from 'class-validator';

export class MessageSeenDto {
    @IsString()
    messageId: string;
    
    @IsString()
    receiverId: string
}