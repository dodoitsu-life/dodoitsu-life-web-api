import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appConfig } from '@config/app.config';
import { NestHttpExceptionFilter } from '@common/exception-filter/ExceptionFilter';

import { DodoitsuModule } from '@application/dodoitsu/dodoitsu.module';
import { AuthModule } from '@application/auth/auth.module';

import { createTypeOrmOptions } from '@infrastructure/orm/typeorm-util';

@Module({
  imports: [
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
    DodoitsuModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NestHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
