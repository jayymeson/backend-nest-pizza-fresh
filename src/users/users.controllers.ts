import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Favorite, User } from '@prisma/client';
import { CreateUsersDTO } from './dto/create.users.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UpdateUserDto } from './dto/updated.user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Find all users',
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Find by id users',
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get('id:/favorites')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Favorite products for users',
  })
  findFavoriteProducts(@Param('id') id: string): Promise<Favorite[]> {
    return this.userService.findFavoriteProducts(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create users',
  })
  create(@Body() createUsersDto: CreateUsersDTO): Promise<User | void> {
    return this.userService.create(createUsersDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete user',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user',
  })
  update(
    @Param('id') id: string,
    @Body() UpdateUserDto: UpdateUserDto,
  ): Promise<User | void> {
    return this.userService.update(id, UpdateUserDto);
  }
}
