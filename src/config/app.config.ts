export const appConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  dodoitsuLifeCallbackUrl:
    process.env.DODOITSU_LIFE_CALLBACK_URL || 'http://localhost:3000',
  cqrsOptions: {
    origin: process.env.CQRS_ORIGIN || 'http://localhost:3000',
  },
  database: {
    url: process.env.DB_URL,
    ssl: process.env.DB_SSL === 'true',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
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
  },
});
