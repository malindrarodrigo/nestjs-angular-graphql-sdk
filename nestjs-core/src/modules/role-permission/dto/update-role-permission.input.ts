import { Field, InputType } from "@nestjs/graphql";
import { UpdatePermissionInput } from "src/modules/permission/dto/update-permission.input";
import { UpdateRoleInput } from "src/modules/roles/dto/update-role.input";

@InputType()
export class UpdateRolePermissionInput {
    
    @Field()
    public id?:number; 

    @Field(()=>UpdatePermissionInput,{nullable:true})
    public permission?:UpdatePermissionInput; 
    
    @Field(()=>UpdateRoleInput,{nullable:true})
    public role?:UpdateRoleInput;
}
