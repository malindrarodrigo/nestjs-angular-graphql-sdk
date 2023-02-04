import { Field, InputType } from "@nestjs/graphql";
import { CreateMenuInput } from "src/modules/menu/dto/create-menu.input";

@InputType()
export class CreatePermissionInput {

    @Field()
    public permissionId:number;

    @Field(()=>CreateMenuInput,{nullable:true})
    public menuId?:CreateMenuInput;

    @Field({nullable:true})
    public permissionName?:string;
}
