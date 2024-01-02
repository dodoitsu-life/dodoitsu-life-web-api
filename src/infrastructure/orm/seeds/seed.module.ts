import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appConfig } from '@config/app.config';
import { createTypeOrmOptions } from '@infrastructure/orm/typeorm-util';

import { UserSeedModule } from './user/user-seed.module';
import { ThemeSeedModule } from './theme/theme-seed.module';
import { DodoitsuSeedModule } from './dodoitsu/dodoitsu-seed.module';

@Module({
  imports: [
    UserSeedModule,
    ThemeSeedModule,
    DodoitsuSeedModule,
    ConfigModule.forRoot({
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        await createTypeOrmOptions(configService),
      inject: [ConfigService],
    }),
  ],
})
export class SeedModule {}
