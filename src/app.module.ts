import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { NestHttpExceptionFilter } from './common/exception-filter/ExceptionFilter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DodoitsuModule } from './application/dodoitsu/dodoitsu.module';
import { Dodoitsu } from './domain/dodoitsu/dodoitsu.entity';
import { appConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      envFilePath: ['.env', '.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        name: 'default',
        type: 'postgres',
        url: configService.get('database.url'),
        ssl: false,
        synchronize: true,
        entities: [Dodoitsu],
        migrations: ['dist/migration/*.js'],
      }),
      inject: [ConfigService],
    }),
    DodoitsuModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NestHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
