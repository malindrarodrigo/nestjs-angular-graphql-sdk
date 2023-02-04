import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleInput } from 'src/modules/roles/dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from 'src/modules/roles/entity/role.entity';
import { RolesService } from 'src/modules/roles/service/roles.service';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private roleService: RolesService) {}

  @Query(() => [Role])
  roles(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Mutation(() => Role)
  createRole(@Args('role') role: CreateRoleInput) {
    return this.roleService.create(role);
  }

  @Query(() => Role)
  findOne(@Args('id') id: number) {
    return this.roleService.findOne(id);
  }

  @Mutation(() => Role)
  updateRole(@Args('role') role: UpdateRoleInput) {
    return this.roleService.update(role);
  }

  @Mutation(() => Role)
  removeRole(@Args('id') id: number) {
    return this.roleService.remove(id);
  }
}
