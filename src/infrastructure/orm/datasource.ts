import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Dodoitsu } from '../../domain/dodoitsu/dodoitsu.entity';

export const createTypeOrmOptions = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    name: 'default',
    type: 'postgres',
    url: configService.get('database.url'),
    ssl: configService.get('database.ssl'),
    synchronize: configService.get('database.synchronize'),
    entities: [Dodoitsu],
    migrations: ['dist/migration/*.js'],
  };
};
