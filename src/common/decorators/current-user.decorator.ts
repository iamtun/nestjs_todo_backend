import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '@shared/entities';

export type TCurrentUser = Pick<User, 'id'>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const user = req?.user;

    if (!user) {
      throw new InternalServerErrorException('EXH_ERR_001');
    }

    return { id: user.sub } as TCurrentUser;
  },
);
