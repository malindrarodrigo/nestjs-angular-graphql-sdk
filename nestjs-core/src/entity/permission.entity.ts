import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolePermission } from "./role-permission.entity";

@Entity('permission')
@ObjectType()
export class Permission {

    @PrimaryGeneratedColumn()
    @Field(type=>Int)
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

    @Column()
    @Field()
    public updateDate:Date;

    @OneToMany(()=>RolePermission,(rolePermission:RolePermission)=>rolePermission.permission)
    public rolePermission:RolePermission[];
}
