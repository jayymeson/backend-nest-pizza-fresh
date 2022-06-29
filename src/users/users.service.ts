import { Injectable } from '@nestjs/common';
import { CreateUsersDTO } from './dto/create.users.dto';

@Injectable()
export class UsersService {
  findAll() {
    return 'Find all message';
  }

  create(createUsersDto: CreateUsersDTO) {
    return 'Create users' + JSON.stringify(createUsersDto);
  }
}
