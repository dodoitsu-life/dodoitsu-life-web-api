export const appConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  cqrsOptions: {
    origin: process.env.CQRS_ORIGIN || 'http://localhost:3000',
  },
  database: {
    url: process.env.DB_URL,
    ssl: process.env.DB_SSL === 'true',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
  },
  session: {
    secret: process.env.SESSION_SECRET || 'test',
  },
  auth: {
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackUrl: process.env.AUTH0_CALLBACK_URL,
  },
});
