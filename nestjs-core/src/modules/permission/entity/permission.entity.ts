import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolePermission } from "src/modules/role-permission/entity/role-permission.entity"; 
import { Menu } from "src/modules/menu/entity/menu.entity";

@Entity('permission')
@ObjectType()
export class Permission {

    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    public id:number;

    @Column()
    @Field()
    public permissionName:string;

    @Column()
    @Field()
    public status:number;

    @Column()
    @Field()
    public createDate:Date;

    @Column({nullable:true})
    @Field()
    public updateDate:Date;

    @ManyToOne(()=>Menu,(menu:Menu)=>menu.permission,{onDelete:'CASCADE'})
    public menu:Menu; 

    @OneToMany(()=>RolePermission,(rolePermission:RolePermission)=>rolePermission.permission,{cascade:true})
    public rolePermission:RolePermission[];
}
