import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateRoleInput {

    @Field()
    public id:number; 

    @Field()
    public roleType:string; 


}
