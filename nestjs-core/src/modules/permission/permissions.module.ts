import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';
import { PermissionsResolver } from './permissions.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([Permission])],
  providers: [PermissionsResolver],
})
export class PermissionsModule {}
