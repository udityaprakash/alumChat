/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import { JwtWsSuccessDto } from './jwtws.dto';

export class MessageSeenDto extends JwtWsSuccessDto {
    @IsString()
    messageId: string;
    
    @IsString()
    receiverId: string
}