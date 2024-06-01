/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';


@Injectable()
export class OAuthService {
    private client: OAuth2Client;

    constructor() {
        this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

    getClient(clientId: string): OAuthClient | undefined {
        // Find the client by clientId
        return this.clients.find((client) => client.clientId === clientId);
    }

}