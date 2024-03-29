import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { FavoriteProductDto } from '../favorite/dto/favorite.dto';
import { Favorite } from 'src/favorite/entities/favortite.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('products')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create products',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all products',
  })
  findAll(@Query() query: Partial<Product>): Promise<Product[]> {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find on product',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get(':id/users-liked')
  @ApiOperation({
    summary: 'Lista de usuários que tem o produto do id enviado como favorito',
  })
  findUsersLiked(@Param('id') id: string) {
    return this.productsService.findUsersLiked(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update of one products',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete products',
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post('favorite')
  @ApiOperation({
    summary: 'Favorite products',
  })
  favorite(@Body() favoriteProductDto: FavoriteProductDto): Promise<Favorite> {
    return this.productsService.favorite(favoriteProductDto);
  }

  @Delete('favorite/:id')
  @ApiOperation({
    summary: 'Unfavor a product',
  })
  unfavorite(@Param('id') id: string) {
    return this.productsService.unfavorite(id);
  }

  @Get('users/:id')
  @ApiOperation({
    summary: 'List a user favorite products',
  })
  getUserFavorites(@Param('id') id: string): Promise<Favorite[]> {
    return this.productsService.getUserFavorites(id);
  }
}
