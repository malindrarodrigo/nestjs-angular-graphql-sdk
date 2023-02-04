import { Field, InputType } from "@nestjs/graphql";
import { CreateMenuInput } from "src/modules/menu/dto/create-menu.input";
import { CreateRoleInput } from "src/modules/roles/dto/create-role.input";

@InputType()
export class CreateRoleMenuInput {

    @Field()
    public roleMenuId:number;

    @Field(()=>CreateMenuInput)
    public menuId:CreateMenuInput;
    
    @Field(()=>CreateRoleInput)
    public roleId:CreateRoleInput;

    @Field()
    public createDate:Date;

    @Field()
    public status:number;

    @Field()
    public updateDate:Date;


}
