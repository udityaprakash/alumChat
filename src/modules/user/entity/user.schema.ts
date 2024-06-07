/* eslint-disable prettier/prettier */
import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  name: string;
  oauthProvider: string;
  oauthId: string;
}

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  oauthProvider: { type: String, required: true },
  oauthId: { type: String, required: true, unique: true },
});
