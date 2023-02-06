import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // update(userId: any, arg1: { refreshToken: any; }) {
  //     throw new Error('Method not implemented.');
  // }
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
  async update(username: string, updateUserDto: UpdateUserInput,) {
    console.log(username);

    const user = await this.userRepository.findOneBy({ username });
    console.log(user);
    console.log(user.refresh_token);
    user.refresh_token = updateUserDto.refreshToken
    console.log(user.refresh_token);

    return this.userRepository.save(user);
  }

}
