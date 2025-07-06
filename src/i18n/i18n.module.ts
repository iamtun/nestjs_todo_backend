import { Global, Module } from '@nestjs/common';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';

const isDevelopment =
  process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: { path: path.join(__dirname, '/'), watch: true },
      resolvers: [
        { use: AcceptLanguageResolver, options: { header: 'Accept-Language' } },
      ],
      typesOutputPath: isDevelopment
        ? path.join(process.cwd(), `/src/i18n/i18n.generated.ts`)
        : undefined,
      logging: isDevelopment,
    }),
  ],
  exports: [I18nModule],
})
export class I18nConfigModule {}
