import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolePermission } from "src/modules/role-permission/entity/role-permission.entity"; 

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

    @OneToMany(()=>RolePermission,(rolePermission:RolePermission)=>rolePermission.permission)
    public rolePermission:RolePermission[];
}
