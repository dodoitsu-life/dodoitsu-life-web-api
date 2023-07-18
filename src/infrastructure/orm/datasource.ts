import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Dodoitsu } from '../../domain/dodoitsu/dodoitsu.entity';
import { User } from 'src/domain/user/user.entity';

export const createTypeOrmOptions = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    name: 'default',
    type: 'postgres',
    url: configService.get('database.url'),
    ssl: {
      rejectUnauthorized: !configService.get('database.ssl'),
    },
    synchronize: configService.get('database.synchronize'),
    entities: [Dodoitsu, User],
    migrations: ['dist/migration/*.js'],
  };
};
