/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import { JwtWsSuccessDto } from './jwtws.dto';

export class MessageDto extends JwtWsSuccessDto {

    @IsString()
    receiverId: string;

    @IsString()
    message: string;
}