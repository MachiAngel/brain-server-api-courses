const knex = require('knex')

const isDev = (process.env.NODE_ENV === 'dev')
console.log(`isDev : ${isDev}`)

let connection = {
  host: !isDev ? process.env.PG_HOST : '127.0.0.1',
  user: !isDev ? process.env.PG_USER : '',
  password: !isDev ? process.env.PG_PASSWORD : '',
  database: !isDev ? process.env.PG_DATABASE : 'smart-brain',
  ssl: !isDev ? true : false
}

console.log('connection:')
console.log(connection)

const db = knex({
  connection,
  client: 'pg'
})


module.exports.db = db

