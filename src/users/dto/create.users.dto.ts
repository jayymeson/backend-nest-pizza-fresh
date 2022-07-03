import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUsersDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Jaymeson',
    description: 'Username to be created',
  })
  nickname: string;

  @IsEmail()
  @ApiProperty({
    example: 'jaymesonmendes@gmail.com',
    description: 'User email to be created',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Weak password',
  })
  @ApiProperty({
    example: '@Abc1234',
    description:
      'User password to be created, minimum of one lowercase letter, one uppercase, one symbol and one number.',
  })
  password: string;

  @IsNumber()
  @ApiProperty({
    example: '26',
    description: 'User age',
  })
  age: number;
}
