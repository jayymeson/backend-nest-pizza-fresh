import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT generated by login ',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5bGFuQGJvc2Nhcmluby5jb20iLCJwYXNzd29yZCI6InlhMGdzcWh5NHd6dnV2YjQifQ.yN_8-Mge9mFgsnYHnPEh_ZzNP7YKvSbQ3Alug9HMCsM',
  })
  token: string;

  @ApiProperty({
    description: 'Authenticated user data',
  })
  user: User;
}
