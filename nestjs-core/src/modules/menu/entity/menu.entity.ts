import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleMenu } from "src/modules/role-menu/entity/role-menu.entity"; 
import { Permission } from "src/modules/permission/entity/permission.entity";

@Entity('menu')
@ObjectType()
export class Menu {

    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    public id:number;

    @Column()
    @Field()
    public icon:string;

    @Column()
    @Field()
    public menuName:string;

    @Column()
    @Field()
    public parentId:number;

    @Column()
    @Field()
    public status:number;

    @Column()
    @Field()
    public createDate:Date;

    @Column({nullable:true})
    @Field()
    public updateDate:Date; 

    @Column()
    @Field()
    public url:string; 

    @OneToMany(()=>RoleMenu,(roleMenu:RoleMenu)=>roleMenu.menu,{cascade:true})
    public roleMenu:RoleMenu[];

    @OneToMany(()=>Permission,(permission:Permission)=>permission.menu,{cascade:true})
    public permission:Permission[];
}
