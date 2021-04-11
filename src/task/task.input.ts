import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateTaskInput {
  @MinLength(1)
  @Field()
  todo: string
}