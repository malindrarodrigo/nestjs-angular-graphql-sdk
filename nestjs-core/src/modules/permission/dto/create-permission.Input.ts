import { Field, InputType } from "@nestjs/graphql";
import { CreateMenuInput } from "src/modules/menu/dto/create-menu.input";

@InputType()
export class CreatePermissionInput {

    @Field()
    public permissionId:number;

    @Field(()=>CreateMenuInput)
    public menuId:CreateMenuInput;

    @Field()
    public permissionName:string;

    @Field()
    public createDate:Date;

    @Field()
    public status:number;

    @Field()
    public updateDate:Date;
}
