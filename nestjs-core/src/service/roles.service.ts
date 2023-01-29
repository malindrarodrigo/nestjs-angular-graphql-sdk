import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleInput } from 'src/dto/create-role.input';
import { UpdateRoleInput } from 'src/dto/update-role.input';
import { Role } from 'src/entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Role) private roleRepo:Repository<Role>){}

    async findAll(): Promise<Role[]>{
        return this.roleRepo.find();
    }

    async create(role:CreateRoleInput):Promise<Role>{
        let roleEntity=this.roleRepo.create(role);
        roleEntity.status=1;
        roleEntity.createDate=new Date();
        return this.roleRepo.save(roleEntity);
    }

    async findOne(id:string):Promise<Role>{
        return await this.roleRepo.findOne({where: {id: parseInt(id, 10)}});
    }

    async update(updateRoleInput:UpdateRoleInput){
        let roleEntity=this.roleRepo.create(updateRoleInput);
        roleEntity.updateDate=new Date();
        return this.roleRepo.save(roleEntity);
    }

    async remove(id:string){
        let roleEntity=this.findOne(id);
        if(roleEntity){
            let ret=await this.roleRepo.delete(id);
            if(ret.affected===1){
                return roleEntity;
            }
        }
        throw new NotFoundException("Record Not Found")
    }

}
