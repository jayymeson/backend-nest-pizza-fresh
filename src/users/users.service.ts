import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { CreateUsersDTO } from './dto/create.users.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  users: Users[] = [];
  findAll() {
    return 'Find all message';
  }

  create(createUsersDto: CreateUsersDTO) {
    const newUser: Users = {
      id: uuid(),
      ...createUsersDto,
      createdAt: undefined,
      updatedAt: undefined,
    };
    this.users.push(newUser);

    return newUser;
  }
}
