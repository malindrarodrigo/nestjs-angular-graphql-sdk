import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  create(createUserInput: CreateUserInput) {
    const user = {
      ...createUserInput,
    }
    const task = this.userRepository.create(user);
    return this.userRepository.save(task);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(username: string) {
    const task = await this.userRepository.findOneBy({ username });
    return task;
  }

}
