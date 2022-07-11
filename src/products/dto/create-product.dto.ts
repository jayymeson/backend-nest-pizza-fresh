import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Pizza of Shrimp',
    description: 'Name of pizza to be created',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Shrimp pizza with catupiry',
    description: 'Description of the pizza to be created',
  })
  description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsNotEmpty()
  @ApiProperty({
    example: 26.0,
    description: 'Price of pizza',
  })
  price: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://i.imgur.com/zIBmPpd.jpg',
    description: 'Link of image of pizza',
  })
  image: string;

  @IsUUID()
  @ApiProperty({
    example: 'Id of category of product',
    description: '42aff534-947c-4d31-a91e-58ff1776e160',
  })
  categoryId: string;
}
