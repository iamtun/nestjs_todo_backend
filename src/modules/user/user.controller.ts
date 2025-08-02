import {
  CurrentUser,
  TCurrentUser,
} from '@common/decorators/current-user.decorator';
import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getUserInfo(@CurrentUser() user: TCurrentUser) {
    return await this.userService.getUserInfo(user.id);
  }
}
