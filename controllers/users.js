const Users = require('../models/users')

module.exports = app => {

    //GET Method
    app.get('/api/v1/user', (req, res) =>  {
        Users.read(res)
    })

    //GET by ID Method
    app.get('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Users.readById(id, res)
    })

    //POST Method
    app.post('/api/v1/user', (req, res) => {
        const users = req.body

        Users.create(users, res)
    })

    //PUT Method
    app.put('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        Users.updatePut(id, values, res)
    })

    //PATCH Method
    app.patch('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        Users.updatePatch(id, values, res)
    })

    app.delete('/api/v1/user/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Users.deletes(id, res)
    })

}