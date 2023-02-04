import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from './entity/role-permission.entity';
import { RolePermissionsResolver } from './role-permissions.resolver'; 

@Module({
  imports:[TypeOrmModule.forFeature([RolePermission])],
  providers: [RolePermissionsResolver],
})
export class RolePermissionsModule {}
