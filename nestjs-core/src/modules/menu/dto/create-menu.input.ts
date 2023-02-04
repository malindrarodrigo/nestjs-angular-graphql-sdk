import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMenuInput {

    @Field()
    public menuId:number;

    @Field()
    public icon:string;

    @Field()
    public menuName:string;

    @Field()
    public parentId:number;

    @Field()
    public url:string;

}
