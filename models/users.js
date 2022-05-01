const moment = require('moment')

const connection = require('../database/connection')


class Users {
    //Create Method
    create(users, res) {
        const birthDate = moment(users.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD')

        const validBirthDate = moment(birthDate).isBefore('2004-01-01')
        const validPassword = users.password.length >= 6

        const validation = [
            {
                name: 'birthDate',
                valid: validBirthDate,
                message: 'User must have at least 18'
            },
            {
                name: 'password',
                valid: validPassword,
                message: 'Password must contain at least 6 characters'
            },

        ]

        const errors = validation.filter(field => !field.valid)
        const errorsExist = errors.length

        if(errorsExist) {
            res.status(400).json(errors)
        } else {
            const bDate = {...users, birthDate}

            const sql = 'INSERT INTO Users SET ?'

            connection.query(sql, bDate, (err, outcome) => {
                if(err) {
                    res.status(400).json(err)
                } else {
                    res.status(201).json(outcome)
                }
            })

        }



    } //End of Create Method

    //Read Method
    read(res) {
        const sql = 'SELECT * FROM Users'

        connection.query(sql, (err, outcome) => {
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(outcome)
            }

        })

    }

    readById(id, res) {
        const sql = `SELECT * FROM Users WHERE id=${id}`
    
        connection.query(sql, (err, outcome) => {
            const user = outcome[0]
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(user)
            }

        })
    }
    
}

module.exports = new Users
