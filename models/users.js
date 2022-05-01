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

            connection.query(sql, bDate, (err, results) => {
                if(err) {
                    res.status(400).json(err)
                } else {
                    res.status(201).json(users)
                }
            })

        }


    //End of Create Method
    } 

    //Read Method
    read(res) {
        const sql = 'SELECT * FROM Users'

        connection.query(sql, (err, results) => {
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(results)
            }

        })

        //End of Read Method
    }

    //Read by Id Method
    readById(id, res) {
        const sql = `SELECT * FROM Users WHERE id=${id}`
    
        connection.query(sql, (err, results) => {
            const user = results[0]
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(user)
            }

        })
    //End of Read by ID Method
    }

    //Update Method

    //PUT
    updatePut(id, values, res) {
        if(values.birthDate) {
            values.birthDate = moment(values.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }

        const sql = 'UPDATE Users SET ? WHERE id=?'

        connection.query(sql, [values, id], (err, results) => {
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(201).json({...values, id}) 
            }
        })
    }

    //PATCH
    updatePatch(id, values, res) {
        if(values.birthDate) {
            values.birthDate = moment(values.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }

        const sql = 'UPDATE Users SET ? WHERE id= ? '

        connection.query(sql, [values, id], (err, results) => {
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(200).json({...values, id}) 
            }
        })
    }

    deletes(id, res) {
        const sql = 'DELETE FROM Users WHERE id=?'

        connection.query(sql, id, (err, results) => {
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(`The user with id: ${id} has been deleted successfully`)

            }
        })
    }
    
}

module.exports = new Users
