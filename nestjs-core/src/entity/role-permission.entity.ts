import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity('role_permission')
@ObjectType()
export class RolePermission {

  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  public id: number;

  @Column()
  @Field()
  public status: number;

  @Column()
  @Field()
  public createDate: Date;

  @Column({nullable:true})
  @Field()
  public updateDate: Date;

  @ManyToOne(()=>Role,(roleId:Role)=>roleId.roleMenu)
  public role:Role;

  @ManyToOne(()=>Permission,(permissionId:Permission)=>permissionId.rolePermission)
  public permission:Permission;
}
