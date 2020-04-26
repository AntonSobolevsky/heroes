import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Picture {
  @Field()
  _id: string;

  @Field()
  filename: string;
}
