import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/modules/menu/entity/menu.entity';
import { Permission } from 'src/modules/permission/entity/permission.entity';
import { CreateRoleMenuInput } from 'src/modules/role-menu/dto/create-role-menu.input';
import { UpdateRoleMenuInput } from 'src/modules/role-menu/dto/update-role-menu.input';
import { RoleMenu } from 'src/modules/role-menu/entity/role-menu.entity';
import { CreateRolePermissionInput } from 'src/modules/role-permission/dto/create-role-permission.input';
import { UpdateRolePermissionInput } from 'src/modules/role-permission/dto/update-role-permission.input';
import { RolePermission } from 'src/modules/role-permission/entity/role-permission.entity';
import { CreateRoleInput } from 'src/modules/roles/dto/create-role.input';
import { UpdateRoleInput } from 'src/modules/roles/dto/update-role.input';
import { Role } from 'src/modules/roles/entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Menu) private menuRepo: Repository<Menu>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
    @InjectRepository(RoleMenu) private roleMenuRepo: Repository<RoleMenu>,
    @InjectRepository(RolePermission)
    private rolePermissionRepo: Repository<RolePermission>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepo.find({where:{status:1}});
  }

  async create(role: CreateRoleInput): Promise<Role> {
    //Save Role Entity
    let roleEntity = this.roleRepo.create(role);
    roleEntity.status = 1;
    roleEntity.createDate = new Date();
    await this.roleRepo.save(roleEntity);

    //Save Role-Menu Entity
    role.roleMenuList.forEach(async (roleMenu: CreateRoleMenuInput) => {
      let menuEntity = await this.menuRepo.findOne({
        where: { id: roleMenu.menu.menuId, status: 1 },
      });

      if (menuEntity) {
        let roleMenuEntity = this.roleMenuRepo.create(roleMenu);
        roleMenuEntity.menu = menuEntity;
        roleMenuEntity.role = roleEntity;
        roleMenuEntity.status = 1;
        roleMenuEntity.createDate = new Date();
        await this.roleMenuRepo.save(roleMenuEntity);
      } else {
        throw new NotFoundException('Menu Record Not Found');
      }
    });

    //Save Role-Permission Entity
    role.rolePermissionList.forEach(
      async (rolePermission: CreateRolePermissionInput) => {
        let permissionEntity = await this.permissionRepo.findOne({
          where: { id: rolePermission.permission.permissionId, status: 1 },
        });

        if (permissionEntity) {
          let rolePermissionEntity =
            this.rolePermissionRepo.create(rolePermission);
          rolePermissionEntity.permission = permissionEntity;
          rolePermissionEntity.role = roleEntity;
          rolePermissionEntity.status = 1;
          rolePermissionEntity.createDate = new Date();
          await this.rolePermissionRepo.save(rolePermissionEntity);
        } else {
          throw new NotFoundException('Permission Record Not Found');
        }
      },
    );

    return roleEntity;
  }

  async findOne(id: number): Promise<Role> {
    return await this.roleRepo.findOne({ where: { id: id, status: 1 } });
  }

  async update(updateRole: UpdateRoleInput) {
    let role = this.roleRepo.create(updateRole);
    let roleEntity = await this.roleRepo.findOne({
      where: { id: role.id, status: 1 },
    });

    if (roleEntity) {
      //Update Role Entity
      roleEntity.updateDate = new Date();
      roleEntity.roleType = role.roleType;
      await this.roleRepo.save(roleEntity);

      updateRole.roleMenuList.forEach(async (roleMenu: UpdateRoleMenuInput) => {
        if (roleMenu.id === 0) {
          let menuEntity = await this.menuRepo.findOne({
            where: { id: roleMenu.menu.menuId, status: 1 },
          });

          //Save New RoleMenu entity
          let roleMenuEntity = this.roleMenuRepo.create(roleMenu);
          roleMenuEntity.menu = menuEntity;
          roleMenuEntity.role = roleEntity;
          roleMenuEntity.status = 1;
          roleMenuEntity.createDate = new Date();
          await this.roleMenuRepo.save(roleMenuEntity);
        } else {
          //Set Status as 0 in Existing RoleMenu Entity
          let roleMenuEntity = await this.roleMenuRepo.findOne({
            where: { id: roleMenu.id, status: 1 },
          });
          roleMenuEntity.status = 0;
          roleMenuEntity.updateDate = new Date();
          await this.roleMenuRepo.save(roleMenuEntity);
        }
      });

      updateRole.rolePermissionList.forEach(
        async (rolePermission: UpdateRolePermissionInput) => {
          if (rolePermission.id === 0) {
            let permissionEntity = await this.permissionRepo.findOne({
              where: { id: rolePermission.permission.permissionId, status: 1 },
            });

            //Save New RolePermission entity
            let rolePermissionEntity =
              this.rolePermissionRepo.create(rolePermission);
            rolePermissionEntity.permission = permissionEntity;
            rolePermissionEntity.role = roleEntity;
            rolePermissionEntity.status = 1;
            rolePermissionEntity.createDate = new Date();
            await this.rolePermissionRepo.save(rolePermissionEntity);
          } else {
            //Set Status as 0 in Existing RolePermission Entity
            let rolePermissionEntity = await this.rolePermissionRepo.findOne({
              where: { id: rolePermission.id, status: 1 },
            });
            rolePermissionEntity.status = 0;
            rolePermissionEntity.updateDate = new Date();
            await this.rolePermissionRepo.save(rolePermissionEntity);
          }
        },
      );
      return roleEntity;
    } else {
      throw new NotFoundException('Record Not Found');
    }
  }

  async remove(id: number) {
    let roleEntity = await this.findOne(id);
    if (roleEntity) {
      roleEntity.updateDate = new Date();
      roleEntity.status = 0;
      await this.roleRepo.save(roleEntity);
      return roleEntity;

      // let ret = await this.roleRepo.delete(id);
      // if (ret.affected === 1) {
      // }
    }
    throw new NotFoundException('Record Not Found');
  }
}
