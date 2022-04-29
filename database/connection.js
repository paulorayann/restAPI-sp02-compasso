const mysql2 = require('mysql2')

const connection =  mysql.createConnetion({
    host: "hostname",
    port: 3306,
    user: "root",
    password: "admin",
    database: 'compasso-sp02'
})

module.exports = connection