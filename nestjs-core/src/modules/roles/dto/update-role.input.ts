import { Field, InputType } from "@nestjs/graphql";
import { UpdateRoleMenuInput } from "src/modules/role-menu/dto/update-role-menu.input";
import { UpdateRolePermissionInput } from "src/modules/role-permission/dto/update-role-permission.input";

@InputType()
export class UpdateRoleInput {

    @Field()
    public id:number; 

    @Field()
    public roleType:string; 

    @Field(()=>[UpdateRoleMenuInput])
    public roleMenuList:UpdateRoleMenuInput[]=[]; 

    @Field(()=>[UpdateRolePermissionInput])
    public rolePermissionList:UpdateRolePermissionInput[]=[]; 


}
