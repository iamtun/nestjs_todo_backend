import { ConfigEnvironmentService } from '@core/config-environment';

export const JWT = {
  SECRET: ConfigEnvironmentService.getIns().get('JWT_SECRET_KEY'),
};
