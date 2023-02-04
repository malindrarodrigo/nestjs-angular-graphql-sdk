import { Module } from '@nestjs/common';
import { RolesService } from 'src/modules/roles/service/roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/modules/roles/entity/role.entity';
import { Menu } from '../menu/entity/menu.entity';
import { Permission } from '../permission/entity/permission.entity';
import { RoleMenu } from '../role-menu/entity/role-menu.entity';
import { RolePermission } from '../role-permission/entity/role-permission.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Role,Menu,Permission,RoleMenu,RolePermission])],
  providers: [RolesService, RolesResolver],
})
export class RolesModule {}
