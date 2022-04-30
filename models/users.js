const moment = require('moment')

const connection = require('../database/connection')


class Users {
    create(users) {
        const birthDate = moment(users.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const bDate = {...users, birthDate}


        const sql = 'INSERT INTO Users SET ?'


        connection.query(sql, bDate, (err, outcome) => {
            if(err) {
                console.log(err)
            } else {
                console.log(outcome)
            }
        })
    }
}

module.exports = new Users
