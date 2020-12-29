import knex from 'knex'

export const connection = knex({
  client: 'pg',
  version: '13.1',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
})
