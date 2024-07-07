/* eslint-disable prettier/prettier */

import { JwtWsSuccessDto } from "./jwtws.dto";
import { IsOptional } from "class-validator";

export class InitiateResponseDto extends JwtWsSuccessDto{
    @IsOptional()
    timestamp: Date;

    constructor(data: any| null= ''){
        super(data);
        this.success = true;
        this.timestamp =new Date(Date.now());
        
    }
}