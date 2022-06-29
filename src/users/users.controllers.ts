import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUsersDTO } from './dto/create.users.dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUsersDto: CreateUsersDTO) {
    return this.userService.create(createUsersDto);
  }
}
