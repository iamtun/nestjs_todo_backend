import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from '@repositories/repository';
import { User } from '@shared/entities';
import { I18nService } from 'nestjs-i18n';

import { RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly model: Repository,
    private readonly i18n: I18nService,
  ) {}

  async register(payload: RegisterDto): Promise<null> {
    const userExisted = await this.model.userRepository.findOne({
      where: { email: payload.email },
    });

    if (userExisted) {
      const errorMessage = this.i18n.t('users.USER.USER_ERR_001');
      throw new ConflictException(errorMessage);
    }

    const user = new User();
    user.email = payload.email;
    user.password = payload.password;
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;

    await this.model.userRepository.save(user);

    return null;
  }
}
