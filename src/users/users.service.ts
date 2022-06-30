import { Injectable } from '@nestjs/common';
import { CreateUsersDTO } from './dto/create.users.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  users: Users[] = [];
  findAll() {
    return 'Find all message';
  }

  create(createUsersDto: CreateUsersDTO) {
    const user: Users = { id: 'random_id', ...createUsersDto };

    this.users.push(user);
    return user;
  }
}
