import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";

@ObjectType()
export class ReResonse {
    @Field()
    user: User;

    @Field()
    refresh_token: string;

    @Field()
    access_token: string;



}
