/* eslint-disable prettier/prettier */


export interface User extends Document {
    email: string;
    name: string;
    oauthProvider: string;
    oauthId: string;
  }