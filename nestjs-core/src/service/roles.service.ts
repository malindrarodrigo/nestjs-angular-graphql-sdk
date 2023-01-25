import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Role) private roleRepo:Repository<Role>){}

    async findAll(): Promise<Role[]>{
        return this.roleRepo.find();

    }
}
