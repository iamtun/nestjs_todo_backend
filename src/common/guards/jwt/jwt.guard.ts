import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  handleRequest(error: any, user) {
    if (error || !user) {
      throw (
        error ||
        new UnauthorizedException({
          message: 'Unauthorized',
          errorCode: 'AAI_ERR_001',
        })
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return user;
  }
}
