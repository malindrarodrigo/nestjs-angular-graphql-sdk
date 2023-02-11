import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Menu } from 'src/modules/menu/entity/menu.entity';
import { Permission } from 'src/modules/permission/entity/permission.entity';
import { CreateRoleMenuInput } from 'src/modules/role-menu/dto/create-role-menu.input';
import { RoleMenu } from 'src/modules/role-menu/entity/role-menu.entity';
import { CreateRolePermissionInput } from 'src/modules/role-permission/dto/create-role-permission.input';
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
    @InjectRepository(Permission) private permissionRepo: Repository<Permission>,
    @InjectRepository(RoleMenu) private roleMenuRepo: Repository<RoleMenu>,
    @InjectRepository(RolePermission) private rolePermissionRepo: Repository<RolePermission>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepo.find();
  }

  async create(role: CreateRoleInput): Promise<Role>{

    //Save Role Entity
    let roleEntity = this.roleRepo.create(role);
    roleEntity.status = 1;
    roleEntity.createDate = new Date();
    await this.roleRepo.save(roleEntity);

    //Save Role-Menu Entity
    role.roleMenuList.forEach(async (roleMenu: CreateRoleMenuInput) => {
      let menuEntity =await this.menuRepo.findOne({
        where: { id: roleMenu.menu.menuId },
      });

      if(menuEntity){
        let roleMenuEntity = this.roleMenuRepo.create(roleMenu);
        roleMenuEntity.menu = menuEntity;
        roleMenuEntity.role=roleEntity;
        roleMenuEntity.status = 1;
        roleMenuEntity.createDate = new Date();
        await this.roleMenuRepo.save(roleMenuEntity); 
      }else{
        throw new NotFoundException('Menu Record Not Found');
      }
    });

    //Save Role-Permission Entity
    role.rolePermissionList.forEach(
      async (rolePermission: CreateRolePermissionInput) => {
        let permissionEntity = await this.permissionRepo.findOne({
          where: { id: rolePermission.permission.permissionId },
        });

        if(permissionEntity){
            let rolePermissionEntity= this.rolePermissionRepo.create(rolePermission);
            rolePermissionEntity.permission=permissionEntity;
            rolePermissionEntity.role=roleEntity;
            rolePermissionEntity.status=1;
            rolePermissionEntity.createDate=new Date();
            await this.rolePermissionRepo.save(rolePermissionEntity);
    
        }else{
            throw new NotFoundException('Permission Record Not Found');
        }
      },
    );

    return roleEntity;
  }

  async findOne(id: number): Promise<Role> {
    return await this.roleRepo.findOne({ where: { id: id } });
  }

  async update(updateRoleInput: UpdateRoleInput) {
    let roleEntity = this.roleRepo.create(updateRoleInput);
    roleEntity.updateDate = new Date();
    return this.roleRepo.save(roleEntity);
  }

  async remove(id: number) {
    let roleEntity = this.findOne(id);
    if (roleEntity) {
      let ret = await this.roleRepo.delete(id);
      if (ret.affected === 1) {
        return roleEntity;
      }
    }
    throw new NotFoundException('Record Not Found');
  }
}
