const moment = require('moment')
const tasks = require('../controllers/tasks')

const connection = require('../database/connection')


class Tasks {

    //Create Method
    create(tasks, res) {

        const date = moment(tasks.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const validDate = moment(date).isAfter(moment())
        const validDescription = tasks.description.length > 10

        //Validation of Fields
        const validation = [
            {
                name: 'date',
                valid: validDate,
                message: 'It must refers to a future date'
            },
            {
                name: 'description',
                valid: validDescription,
                message: 'Field must not be empty and must contain at least 10 characters'
            },
            
        ]

        const errors = validation.filter(field => !field.valid)
        const errorsExist = errors.length

        if(errorsExist) {
            res.status(400).json(errors)
        } else {
            const taskDate = {...tasks, date}

            const sql = 'INSERT INTO Tasks SET ?'

            connection.query(sql, taskDate, (err, results) => {
                if(err) {
                    res.status(400).json(err)
                } else {
                    res.status(201).json(tasks)
                }
            })

        }


    //End of Create Method
    } 

    //Read Method
    read(res) {
        const sql = 'SELECT tasks.*, users.id FROM tasks JOIN users on tasks.user = users.id'
    
    

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
        const sql = `SELECT tasks.*, users.id FROM tasks JOIN users on tasks.user = users.id WHERE user=${id}`
        
    
        connection.query(sql, (err, results) => {
            const tasks = results[0]
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(tasks)
            }
        })
    //End of Read by ID Method
    }

    //Update Method

    //PUT
    updatePut(id, values, res) {
        if(values.date) {
            values.date = moment(values.date, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
        }

        const sql = 'UPDATE Tasks SET ? WHERE user=?'

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
        if(values.date) {
            values.date = moment(values.date, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
        }

        const sql = 'UPDATE Tasks SET ? WHERE user= ? '

        connection.query(sql, [values, id], (err, results) => {
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(200).json({...values, id}) 
            }
        })
    }
    
    //DELETE METHOD
    deletes(id, res) {
        const sql = 'DELETE FROM Tasks WHERE user=?'

        connection.query(sql, id, (err, results) => {
            if(err) {
                res.status(404).json(err)
            } else {
                res.status(200).json(`The task with id: ${id} has been deleted successfully`)

            }
        })
    }

}

module.exports = new Tasks
