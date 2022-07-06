import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Users } from 'src/users/entities/users.entity';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary: 'Create an order',
  })
  create(user: Users, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(user.id, createOrderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all products',
  })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'List a product',
  })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}
