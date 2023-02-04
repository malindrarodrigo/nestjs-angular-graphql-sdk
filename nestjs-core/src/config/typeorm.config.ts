import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Menu } from 'src/modules/menu/entity/menu.entity';
import { Permission } from 'src/modules/permission/entity/permission.entity';
import { RoleMenu } from 'src/modules/role-menu/entity/role-menu.entity';
import { RolePermission } from 'src/modules/role-permission/entity/role-permission.entity';
import { Role } from 'src/modules/roles/entity/role.entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Menu, Role, Permission, RolePermission, RoleMenu],
      synchronize: true,
    };
  },
};
