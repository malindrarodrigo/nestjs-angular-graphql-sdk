import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./menu.entity";
import { Role } from "./role.entity";

@Entity('role_menu')
@ObjectType()
export class RoleMenu {

    @PrimaryGeneratedColumn()
    @Field(type=>Int)
    public id:number;

    @Column()
    @Field()
    public status:number;

    @Column()
    @Field()
    public createDate:Date;

    @Column({nullable:true})
    @Field()
    public updateDate:Date;

    @ManyToOne(()=>Menu,(menuId:Menu)=>menuId.roleMenu)
    public menu:Menu;

    @ManyToOne(()=>Role,(roleId:Role)=>roleId.roleMenu)
    public role:Role;
}
