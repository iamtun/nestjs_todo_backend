import { ConfigEnvironmentService } from '@core/config-environment';
import { I18nTranslations } from '@i18n/i18n.generated';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { NextFunction } from 'express';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  use(req: Request, _: Response, next: NextFunction) {
    const bearerToken: string = req.headers['authorization'];

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    try {
      const token = bearerToken.split(' ')[1];
      const decoded = this.jwtService.verify(token, {
        secret: ConfigEnvironmentService.getIns().get<string>('JWT_SECRET_KEY'),
      });

      // TODO: Validate token in blacklist
      req['user'] = decoded;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        const message = this.i18nService.t('errors.auth.AUTH_ERR_003');
        throw new UnauthorizedException(message, { cause: 'AUTH_ERR_003' });
      }

      if (error instanceof JsonWebTokenError) {
        const message = this.i18nService.t('errors.auth.AUTH_ERR_001');
        throw new UnauthorizedException(message, { cause: 'AUTH_ERR_001' });
      }

      throw new UnauthorizedException();
    }

    next();
  }
}
