import { Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/entity/role.entity';
import { RolesService } from 'src/service/roles.service';

@Resolver(() => Role)
export class RolesResolver {
    constructor(private roleService:RolesService){}

    @Query(()=>[Role])
    roles():Promise<Role[]>{
        return this.roleService.findAll();
    }
}
