    
    module.exports = app => {
    
    
    //GET Method
    app.get('/api/v1/task', (req, res) =>  {
        Users.read(res)
    })

    //GET by ID Method
    app.get('/api/v1/task/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Users.readById(id, res)
    })



    //POST Method
    app.post('/api/v1/task',(req, res) => res.send('Test'))

    /*
    app.post('/api/v1/task', (req, res) => {
        const users = req.body

        Users.create(users, res)
    })
    */


}