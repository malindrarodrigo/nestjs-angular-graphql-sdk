import { Field, InputType } from "@nestjs/graphql";
import { CreateMenuInput } from "src/modules/menu/dto/create-menu.input";
import { CreateRoleInput } from "src/modules/roles/dto/create-role.input";

@InputType()
export class CreateRoleMenuInput {

    @Field(()=>CreateMenuInput)
    public menu:CreateMenuInput;
    
    @Field(()=>CreateRoleInput,{nullable:true})
    public role?:CreateRoleInput;
}
