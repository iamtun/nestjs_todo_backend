import { Injectable } from '@nestjs/common';
import { Repository } from '@repositories/repository';

@Injectable()
export class UserService {
  constructor(private readonly model: Repository) {}

  async getUserInfo(userId: string) {
    const userInfo = await this.model.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'firstName', 'lastName'],
    });

    return userInfo;
  }
}
