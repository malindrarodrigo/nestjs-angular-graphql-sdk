import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleMenu } from "../../role-menu/entity/role-menu.entity";
import { RolePermission } from "../../role-permission/entity/role-permission.entity";

@Entity('role')
@ObjectType()
export class Role{
    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    public id:number;

    @Column()
    @Field()
    public roleType:string;

    @Column()
    @Field()
    public status:number;

    @Column()
    @Field()
    public createDate:Date;

    @Column({nullable:true})
    @Field()
    public updateDate:Date;

    @OneToMany(()=>RoleMenu,(roleMenu:RoleMenu)=>roleMenu.role,{cascade:true})
    public roleMenu:RoleMenu[];

    @OneToMany(()=>RolePermission,(rolePermission:RolePermission)=>rolePermission.role,{cascade:true})
    public rolePermission:RolePermission[];
}