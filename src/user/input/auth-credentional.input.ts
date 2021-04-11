import { Field, InputType } from "@nestjs/graphql"
import { MaxLength, MinLength } from "class-validator"

@InputType()
export class AuthCredentionalInput {
  @MinLength(4)
  @MaxLength(12)
  @Field()
  nickname: string

  @MinLength(6)
  @MaxLength(12)
  @Field()
  password: string
}