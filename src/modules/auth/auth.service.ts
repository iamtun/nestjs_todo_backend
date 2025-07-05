import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@repositories/entities';
import { Repository } from '@repositories/repository';

import { RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly model: Repository) {}

  async register(payload: RegisterDto): Promise<null> {
    const userExisted = await this.model.userRepository.findOne({
      where: { email: payload.email },
    });

    if (userExisted) {
      throw new ConflictException('User already exists with this email');
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
