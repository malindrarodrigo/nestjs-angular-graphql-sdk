import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleInput } from 'src/dto/create-role.input';
import { UpdateRoleInput } from 'src/dto/update-role.input';
import { Role } from 'src/entity/role.entity';
import { RolesService } from 'src/service/roles.service';

@Resolver(() => Role)
export class RolesResolver {
    constructor(private roleService:RolesService){}

    @Query(()=>[Role])
    roles():Promise<Role[]>{
        return this.roleService.findAll();
    }

    @Mutation(()=>Role)
    createRole(@Args ('role')role:CreateRoleInput){
        return this.roleService.create(role);
    }

    @Query(()=>Role)
    findOne(@Args('id')id:string){
        return this.roleService.findOne(id);
    }

    @Mutation(()=>Role)
    updateRole(@Args ('role')role:UpdateRoleInput){
        return this.roleService.update(role);
    }

    @Mutation(()=>Role)
    removeRole(@Args('id')id:string){
        return this.roleService.remove(id);
    }

}
