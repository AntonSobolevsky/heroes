import { Field, ObjectType } from '@nestjs/graphql';

import { IPicture } from '../interfaces/picture.interface';
import { Picture } from './picture.model';

@ObjectType()
export class Hero {
  @Field()
  _id: string;

  @Field()
  nickname: string;

  @Field({nullable: true})
  real_name: string;

  @Field({nullable: true})
  origin_description: string;

  @Field(type => [String], { nullable: 'items' })
  superpowers: string[];

  @Field({nullable: true})
  catch_phrase: string;

  @Field(type => [Picture])
  images: IPicture[];
}
