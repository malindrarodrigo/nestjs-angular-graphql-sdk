import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RolesModule } from './modules/roles/roles.module';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { Menu } from './entity/menu.entity';
import { Permission } from './entity/permission.entity';
import { RolePermission } from './entity/role-permission.entity';
import { RoleMenu } from './entity/role-menu.entity';

@Module({
  imports: [
    GraphQLModule.forRoot ({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver:ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root1234',
      database: 'nest_role_management',
      entities: [Menu,Role,Permission,RolePermission,RoleMenu],
      synchronize: true,
    }),
    
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
