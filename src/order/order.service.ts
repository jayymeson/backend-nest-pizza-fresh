import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorConstraintUnique } from 'src/utils/handle-error.util';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  create(createOrderDto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: {
        connect: {
          id: createOrderDto.userId,
        },
      },
      table: {
        connect: {
          number: createOrderDto.tableNumber,
        },
      },
      products: {
        connect: createOrderDto.products.map((productId) => ({
          id: productId,
        })),
      },
    };
    return this.prisma.order
      .create({
        data,
        select: {
          id: true,
          table: {
            select: {
              number: true,
            },
          },
          user: {
            select: {
              nickname: true,
            },
          },
          products: {
            select: {
              name: true,
            },
          },
        },
      })
      .catch(handleErrorConstraintUnique);
  }

  findAll() {
    return `This action returns all order`;
  }

  async verifyingTheOrder(id: string): Promise<Order> {
    const order: Order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`ID record '${id}' not found`);
    }

    return order;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }
}
