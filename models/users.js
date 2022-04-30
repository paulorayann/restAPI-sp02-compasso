const connection = require('../database/connection')

class Users {
    create(users) {
        const sql = 'INSERT INTO Users SET ?'


        connection.query(sql, users, (err, outcome) => {
            if(err) {
                console.log(err)
            } else {
                console.log(outcome)
            }
        })
    }
}

module.exports = new Users