export const appConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  cqrsOptions: {
    origin: process.env.CQRS_ORIGIN || 'http://localhost:3000',
  },
  database: {
    url: process.env.DB_URL,
  },
});
