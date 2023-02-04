import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entity/menu.entity';
import { MenusResolver } from './menus.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([Menu])],
  providers: [MenusResolver],
})
export class MenusModule {}
