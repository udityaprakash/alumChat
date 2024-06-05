/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class MessageDto {

    @IsString()
    receiverId: string;

    @IsString()
    message: string;
}