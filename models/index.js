const mysql = require('mysql')

const conn = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  port: '3306',
  user: 'sql12246216',
  password: 'EFWfBsElNK',
  database: 'sql12246216'
})
conn.connect()

module.exports = conn