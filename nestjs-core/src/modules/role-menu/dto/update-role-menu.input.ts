import { Field, InputType } from "@nestjs/graphql";
import { UpdateMenuInput } from "src/modules/menu/dto/update-menu.input";
import { UpdateRoleInput } from "src/modules/roles/dto/update-role.input";

@InputType()
export class UpdateRoleMenuInput {

    @Field()
    public id:number; 

    @Field(()=>UpdateMenuInput,{nullable:true})
    public menu?:UpdateMenuInput;
    
    @Field(()=>UpdateRoleInput,{nullable:true})
    public role?:UpdateRoleInput;
}
