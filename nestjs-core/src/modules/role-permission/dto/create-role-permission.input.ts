import { Field, InputType } from "@nestjs/graphql";
import { CreatePermissionInput } from "src/modules/permission/dto/create-permission.Input";
import { CreateRoleInput } from "src/modules/roles/dto/create-role.input";

@InputType()
export class CreateRolePermissionInput {

    @Field(()=>CreatePermissionInput)
    public permission:CreatePermissionInput; 
    
    @Field(()=>CreateRoleInput,{nullable:true})
    public role?:CreateRoleInput;

}
