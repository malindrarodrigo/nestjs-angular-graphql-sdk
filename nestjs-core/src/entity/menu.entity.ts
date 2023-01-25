import { Field, Int, ObjectType } from "@nestjs/graphql";
import { first } from "rxjs";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleMenu } from "./role-menu.entity";

@Entity('menu')
@ObjectType()
export class Menu {

    @PrimaryGeneratedColumn()
    @Field(type=>Int)
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

    @Column()
    @Field()
    public updateDate:Date;

    @Column()
    @Field()
    public url:string;

    @OneToMany(()=>RoleMenu,(roleMenu:RoleMenu)=>roleMenu.menu)
    public roleMenu:RoleMenu[];
}
