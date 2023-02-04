import { Test, TestingModule } from '@nestjs/testing';
import { RolePermissionsResolver } from './role-permissions.resolver';

describe('RolePermissionsResolver', () => {
  let resolver: RolePermissionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolePermissionsResolver],
    }).compile();

    resolver = module.get<RolePermissionsResolver>(RolePermissionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
