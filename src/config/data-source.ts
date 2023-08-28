import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'dodoitsulife',
  logging: process.env.DB_LOGGING === 'true',
  entities: ['./src/domain/**/*.entity.ts'],
  migrations: ['./src/infrastructure/orm/migrations/*.ts'],
});
export default AppDataSource;