import { ConfigEnvironmentService } from '@core/config-environment';
import { I18nTranslations } from '@i18n/i18n.generated';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from '@repositories/repository';
import { User } from '@shared/entities';
import { I18nService } from 'nestjs-i18n';

import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly model: Repository,
    private readonly i18n: I18nService<I18nTranslations>,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterDto): Promise<null> {
    const userExisted = await this.model.userRepository.exists({
      where: { email: payload.email },
    });

    if (userExisted) {
      const errorMessage = this.i18n.t('errors.user.USER_ERR_002');
      throw new ConflictException(errorMessage, { cause: 'USER_ERR_002' });
    }

    const user = new User();
    user.email = payload.email;
    user.password = payload.password;
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;

    await this.model.userRepository.save(user);

    return null;
  }

  async login(
    payload: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = payload;

    const user = await this.model.userRepository.findOne({ where: { email } });

    if (!user) {
      const errorMessage = this.i18n.t('errors.user.USER_ERR_003');
      throw new ConflictException(errorMessage, { cause: 'USER_ERR_003' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      const errorMessage = this.i18n.t('errors.user.USER_ERR_003');
      throw new ConflictException(errorMessage, { cause: 'USER_ERR_003' });
    }

    const payloadToken = { sub: user.id };

    const accessToken = this.jwtService.sign(payloadToken);
    const refreshToken = this.jwtService.sign(payloadToken, {
      expiresIn: ConfigEnvironmentService.getIns().get<string>(
        'JWT_REFRESH_EXPIRATION_TIME',
      ),
      secret:
        ConfigEnvironmentService.getIns().get<string>('JWT_REFRESH_SECRET'),
    });

    return { accessToken, refreshToken };
  }
}
