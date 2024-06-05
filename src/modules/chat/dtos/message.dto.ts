/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class MessageDto {
    // @IsString()
    // senderId: string;

    @IsString()
    receiverId: string;

    @IsString()
    message: string;
}