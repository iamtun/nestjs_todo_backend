import { ConfigEnvironmentService } from '@core/config-environment';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Repository } from '@repositories/repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: ConfigEnvironmentService.getIns().get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: ConfigEnvironmentService.getIns().get<string>(
          'JWT_EXPIRATION_TIME',
        ),
      },
    }),
  ],
  providers: [AuthService, Repository],
  controllers: [AuthController],
})
export class AuthModule {}
