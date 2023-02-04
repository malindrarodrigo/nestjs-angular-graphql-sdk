import { Test, TestingModule } from '@nestjs/testing';
import { RoleMenusResolver } from './role-menus.resolver';

describe('RoleMenusResolver', () => {
  let resolver: RoleMenusResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleMenusResolver],
    }).compile();

    resolver = module.get<RoleMenusResolver>(RoleMenusResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
