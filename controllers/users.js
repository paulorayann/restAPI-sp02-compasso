const Users = require('../models/users')

module.exports = app => {
    app.get('/users', (req, res) => res.send('GET request in the "Users" route'))

    app.post('/users', (req, res) => {
        const users = req.body

        Users.create(users, res)

    })

}