import {
  CurrentUser,
  TCurrentUser,
} from '@common/decorators/current-user.decorator';
import { JWTAuthGuard } from '@common/guards/jwt/jwt.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('/users')
@UseGuards(JWTAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getUserInfo(@CurrentUser() user: TCurrentUser) {
    return await this.userService.getUserInfo(user.id);
  }
}
