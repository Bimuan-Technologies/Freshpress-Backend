export default () => ({
  env: process.env.NODE_ENV,

  http: {
    host: process.env.HTTP_HOST,
    port: parseInt(process.env.HTTP_PORT, 10),
  },

  database: {
    database_url: process.env.DATABASE_URL,
    database_port: process.env.DATABASE_PORT,
    database_username: process.env.DATABASE_USERNAME,
    database_password: process.env.DATABASE_PASSWORD,
  },
});
