import { Module } from '@nestjs/common';
import { RolesService } from 'src/modules/roles/service/roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/modules/roles/entity/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Role])],
  providers: [RolesService, RolesResolver],
})
export class RolesModule {}
