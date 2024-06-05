/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class GoogleSigninDto {
    @IsString()
    oauthToken: string;
}
