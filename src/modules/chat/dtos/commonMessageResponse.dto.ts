/* eslint-disable prettier/prettier */
import { Message } from "../interfaces/chatmessage.interface";
import { JwtWsSuccessDto } from "./jwtws.dto";
export class CommonMessageResponseDto extends JwtWsSuccessDto{

    constructor(data: Message){
        super(data);
        this.success = true;
        
    }
}