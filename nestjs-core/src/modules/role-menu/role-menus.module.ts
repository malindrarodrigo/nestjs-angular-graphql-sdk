import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenu } from './entity/role-menu.entity';
import { RoleMenusResolver } from './role-menus.resolver'; 

@Module({
  imports:[TypeOrmModule.forFeature([RoleMenu])],
  providers: [RoleMenusResolver],
})
export class RoleMenusModule {}
