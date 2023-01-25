import { Module } from '@nestjs/common';
import { RolesService } from 'src/service/roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Role])],
  providers: [RolesService, RolesResolver]
})
export class RolesModule {}
