const Tasks = require('../models/tasks')

module.exports = app => {

    //GET Method
    app.get('/api/v1/task', (req, res) =>  {
        Tasks.read(res)
    })

    //GET by ID Method
    app.get('/api/v1/task/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Tasks.readById(id, res)
    })

    //POST Method
    app.post('/api/v1/task', (req, res) => {
        const tasks = req.body

        Tasks.create(tasks, res)
    })

    //PUT Method
    app.put('/api/v1/task/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        Tasks.updatePut(id, values, res)
    })

    //PATCH Method
    app.patch('/api/v1/task/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        Tasks.updatePatch(id, values, res)
    })
    
    //DELETE Method
    app.delete('/api/v1/task/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Tasks.deletes(id, res)
    })

  }