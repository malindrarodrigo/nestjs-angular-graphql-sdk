import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateRoleInput {

    @Field()
    public roleType:string; 

}
