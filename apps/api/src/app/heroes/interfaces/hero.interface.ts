import { Document } from 'mongoose';

import { IPicture } from './picture.interface';

export interface IHero extends Document {
  _id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: IPicture[];
}
