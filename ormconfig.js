module.exports = {
  type: process.env.TYPE_ORM_DEFAULT_TYPE,
  host: process.env.TYPE_ORM_DEFAULT_HOST,
  port: process.env.TYPE_ORM_DEFAULT_PORT,
  username: process.env.TYPE_ORM_DEFAULT_USERNAME,
  password: process.env.TYPE_ORM_DEFAULT_PASSWORD,
  database: process.env.TYPE_ORM_DEFAULT_DATABASE,
  synchronize: false,
  entities: [
    './src/models/*.ts'
  ],
  migrations: [
    './src/database/migrations/*.ts'
  ],
  cli: {
    migrationsDir: './src/database/migrations',
  },
}