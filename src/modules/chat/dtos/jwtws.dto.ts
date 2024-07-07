/* eslint-disable prettier/prettier */
import { IsBoolean, IsString } from 'class-validator';

export class JwtWsErrorDto {

    @IsBoolean()
    success: boolean = false;

    @IsBoolean()
    jwterror: boolean = true;

    @IsBoolean()
    loginrequired: boolean;

    @IsString()
    jwtmessage: string;

    constructor(jwtmessage: string, loginrequired : boolean) {
        this.jwtmessage = jwtmessage;
        this.loginrequired = loginrequired;
    }
}

export class JwtWsSuccessDto {

    @IsBoolean()
    success: boolean;

    @IsBoolean()
    jwterror: boolean = false;

    @IsBoolean()
    loginrequired: boolean = false;

    @IsString()
    jwtmessage: string = '';

    data: any;

    constructor(data: any ) {
        this.data = data;
    }

}