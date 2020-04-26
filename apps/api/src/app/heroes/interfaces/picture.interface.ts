import { Document } from 'mongoose';

export interface IPicture extends Document {
  _id: string;
  filename: string;
}
