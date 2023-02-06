import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class RefreshTokenInput {
    @Field()
    username: string;

    @Field()
    refresh_token: string;



}
