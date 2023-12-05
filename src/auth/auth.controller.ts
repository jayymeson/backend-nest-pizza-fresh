import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'By logging in, an authentication token',
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Returns a verified user',
  })
  @ApiBearerAuth()
  profile() {
    return { message: 'Successful authentication' };
  }

  @Post('mock-login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Mock login for a specific user',
  })
  mockLogin(): Promise<LoginResponseDto> {
    const mockUser = {
      email: 'jaymeson@teste.com.br',
      password: 'Abc1234*',
    };
    return this.authService.mockLogin(mockUser);
  }
}
