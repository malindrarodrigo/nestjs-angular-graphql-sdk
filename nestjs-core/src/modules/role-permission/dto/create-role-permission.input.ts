import { Field, InputType } from "@nestjs/graphql";
import { CreatePermissionInput } from "src/modules/permission/dto/create-permission.Input";
import { CreateRoleInput } from "src/modules/roles/dto/create-role.input";

@InputType()
export class CreateRolePermissionInput {

    @Field()
    public rolePermissionId:number;
    
    @Field(()=>CreatePermissionInput)
    public permissionId:CreatePermissionInput; 
    
    @Field(()=>CreateRoleInput)
    public roleId:CreateRoleInput;
    
    @Field()
    public createDate:Date;
    
    @Field()
    public status:number;
    
    @Field()
    public updateDate:Date; 
}
