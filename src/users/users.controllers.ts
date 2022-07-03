import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUsersDTO } from './dto/create.users.dto';
import { UpdateUserDto } from './dto/updated.user.dto';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  @ApiOperation({
    summary: 'Find all users',
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find by id users',
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create users',
  })
  create(@Body() createUsersDto: CreateUsersDTO): Promise<Users> {
    return this.userService.create(createUsersDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
  })
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user',
  })
  update(
    @Param('id') id: string,
    @Body() UpdateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.remove(id, UpdateUserDto);
  }
}
