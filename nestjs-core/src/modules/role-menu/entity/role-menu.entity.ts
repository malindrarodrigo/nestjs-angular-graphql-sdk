import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "src/modules/menu/entity/menu.entity";
import { Role } from "../../roles/entity/role.entity";

@Entity('role_menu')
@ObjectType()
export class RoleMenu {

    @PrimaryGeneratedColumn()
    @Field(()=>Int)
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

    @ManyToOne(()=>Menu,(menuId:Menu)=>menuId.roleMenu,{onDelete:'CASCADE'})
    public menu:Menu;

    @ManyToOne(()=>Role,(roleId:Role)=>roleId.roleMenu,{onDelete:'CASCADE'})
    public role:Role;
}
