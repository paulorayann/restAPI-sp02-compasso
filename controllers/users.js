const Users = require('../models/users')

module.exports = app => {

    //GET Method
    app.get('/api/v1/user', (req, res) =>  {
        Users.read(res)

    })
    //GET by ID
    app.get('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Users.readById(id, res)
    })



    app.post('/api/v1/user', (req, res) => {
        const users = req.body

        Users.create(users, res)

    })

}