import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FavoriteProductDto {
  @IsUUID()
  @ApiProperty({
    description: 'User ID who bookmarked the product',
    example: 'e53aa5d6-89ca-47c0-b42b-fcb2c55ce751',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Product name',
    example: 'Pizza of Shirimp',
  })
  productName: string;
}
