const mysql = require('mysql2')

const connection =  mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "admin",
    database: 'compasso-sp02'
})

module.exports = connection