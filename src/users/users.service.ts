import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return 'Find all message';
  }

  create() {
    return 'Create users';
  }
}
