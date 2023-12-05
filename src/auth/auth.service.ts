import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Users and/or password not found');
    }

    const isHashValid = await bcrypt.compare(password, user.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Users and/or password not found');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({ email }),
      user,
    };
  }

  async mockLogin(loginDto: LoginDto): Promise<LoginResponseDto> {
    // Aqui você pode buscar o usuário mock diretamente ou criar uma lógica específica
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Mock user not found');
    }

    // Assumindo que a senha já está correta, pois é um mock
    delete user.password;

    return {
      token: this.jwtService.sign({ email: user.email }),
      user,
    };
  }
}
