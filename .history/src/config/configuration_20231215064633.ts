export default () => ({
  env: process.env.NODE_ENV,

  http: {
    host: process.env.HTTP_HOST || '127.0.0.1',
    port: parseInt(process.env.HTTP_PORT, 10) || 8000,
  },

  db: {
    database_url: process.env.DATABASE_HOST,
    database_port: process.env.DATABASE_PORT,
    database_name: process.env.DATABASE_NAME,
    database_username: process.env.DATABASE_USER,
    database_password: process.env.DATABASE_PASSWORD,
    database_synchronize: process.env.DATABASE_SYNC,
  },
});
