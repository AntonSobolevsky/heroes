import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateHeroInput {
  @Field()
  nickname: string;
}
