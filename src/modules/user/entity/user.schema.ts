/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  oauthProvider: { type: String, required: true },
  oauthId: { type: String, required: true, unique: true },
});
