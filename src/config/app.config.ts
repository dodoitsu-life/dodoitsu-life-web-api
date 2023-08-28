export const appConfig = () => ({
  isLocal: process.env.DODOITSULIFE_ENV === 'local',
  port: parseInt(process.env.PORT, 10) || 3000,
  dodoitsuLifeCallbackUrl:
    process.env.DODOITSU_LIFE_CALLBACK_URL ||
    'http://localhost:3000/api/auth/login/callback',
  cqrsOptions: {
    origin: process.env.CQRS_ORIGIN || 'http://localhost:3000',
  },
  database: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'postgres',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dodoitsulife',
    ssl: process.env.DB_SSL === 'true',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
  },
  session: {
    secret: process.env.SESSION_SECRET || 'secret',
  },
  auth: {
    twitter: {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackUrl: process.env.TWITTER_CALLBACK_URL,
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'secret',
      expire: process.env.JWT_EXPIRE || '4h',
    },
  },
});
