import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Dodoitsu } from '../../domain/dodoitsu/dodoitsu.entity';
import { User } from 'src/domain/user/user.entity';
export const createTypeOrmOptions = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const ssl = configService.get('isLocal')
    ? false
    : {
        rejectUnauthorized: false,
      };

  return {
    name: 'default',
    type: 'postgres',
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.database'),
    logging: configService.get('database.logging'),
    ssl,
    synchronize: configService.get('database.synchronize'),
    entities: [Dodoitsu, User],
    migrations: ['dist/migration/*.js'],
  };
};
