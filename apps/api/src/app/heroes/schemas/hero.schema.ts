import * as mongoose from 'mongoose';

export const HeroSchema = new mongoose.Schema({
  nickname: String,
  real_name: String,
  origin_description: String,
  superpowers: [String],
  catch_phrase: String,
  images: [{
    filename: String
  }]
});
