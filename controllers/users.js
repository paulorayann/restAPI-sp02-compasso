module.exports = app => {
    app.get('/users', (req, res) => res.send('GET request in the "Users" route'))

    app.post('/users', (req, res) => {
        console.log(req.body)
        res.send('POST request in the "Users" route')})

}