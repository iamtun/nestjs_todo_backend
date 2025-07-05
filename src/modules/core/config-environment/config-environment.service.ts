import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigEnvironmentService {
  private static configService: ConfigService;
  constructor(private readonly configService: ConfigService) {
    ConfigEnvironmentService.configService = configService;
  }

  public static getIns() {
    if (!ConfigEnvironmentService.configService) {
      ConfigEnvironmentService.configService = new ConfigService();
    }
    return ConfigEnvironmentService.configService;
  }

  get<T>(key: string) {
    return ConfigEnvironmentService.configService.get<T>(key);
  }
}
