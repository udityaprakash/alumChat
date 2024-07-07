/* eslint-disable prettier/prettier */
import { IsBoolean, IsString } from 'class-validator';

export class JwtWsErrorDto {

    @IsBoolean()
    success: boolean = false;

    @IsBoolean()
    jwterror: boolean = true;

    @IsString()
    jwtmessage: string;

    constructor(jwtmessage: string) {
        this.jwtmessage = jwtmessage;
    }
}

export class JwtWsSuccessDto {

    @IsBoolean()
    success: boolean = true;

    @IsBoolean()
    jwterror: boolean = false;

    @IsString()
    jwtmessage: string = '';

    data: any;

    constructor(data: any ) {
        this.data = data;
    }

}