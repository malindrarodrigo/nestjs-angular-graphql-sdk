import { Field, InputType } from "@nestjs/graphql";
import { CreateRoleMenuInput } from "src/modules/role-menu/dto/create-role-menu.input";
import { CreateRolePermissionInput } from "src/modules/role-permission/dto/create-role-permission.input";

@InputType()
export class CreateRoleInput {

    @Field()
    public roleType:string; 

    @Field(()=>[CreateRoleMenuInput])
    public roleMenuList:CreateRoleMenuInput[]=[]; 

    @Field(()=>[CreateRolePermissionInput])
    public rolePermissionList:CreateRolePermissionInput[]=[]; 

}
