import {
  CurrentUser,
  TCurrentUser,
} from '@common/decorators/current-user.decorator';
import { JWTAuthGuard } from '@common/guards/jwt/jwt.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { LoginDto, RefreshTokenDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(body);
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return await this.authService.refreshToken(body.refreshToken);
  }

  @Post('/logout')
  @UseGuards(JWTAuthGuard)
  async logout(@CurrentUser() user: TCurrentUser) {
    return await this.authService.logout(user.id);
  }
}
