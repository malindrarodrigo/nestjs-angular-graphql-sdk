import { Field, InputType } from "@nestjs/graphql";
import { UpdateMenuInput } from "src/modules/menu/dto/update-menu.input";

@InputType()
export class UpdatePermissionInput {
    
    @Field()
    public permissionId:number;

    @Field(()=>UpdateMenuInput,{nullable:true})
    public menuId?:UpdateMenuInput;

    @Field({nullable:true})
    public permissionName?:string;
}
