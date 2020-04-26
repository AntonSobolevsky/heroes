import { InputType, Field, ID } from "@nestjs/graphql";

@InputType()
export class UpdateHeroInput {
  @Field(type => ID)
  _id: string;

  @Field()
  nickname: string;

  @Field()
  real_name: string;

  @Field()
  origin_description: string;

  @Field(type => [String], { nullable: 'items' })
  superpowers: string[];

  @Field()
  catch_phrase: string;
}
