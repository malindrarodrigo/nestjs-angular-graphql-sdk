import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateMenuInput {

    @Field()
    public menuId:number;

    @Field({nullable:true})
    public icon?:string;

    @Field({nullable:true})
    public menuName?:string;

    @Field({nullable:true})
    public parentId?:number;

    @Field({nullable:true})
    public url?:string;
}
