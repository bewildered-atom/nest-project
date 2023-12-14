export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      dialect : process.env.DB_DIALECT,
      port: parseInt(process.env.DB_PORT, 10) || 5432
    },
    awsConfig: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      bucket: process.env.AWS_BUCKET_NAME
    }
  });