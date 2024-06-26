/* eslint-disable prettier/prettier */
export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    timestamp: Date;
    seen: boolean;
}