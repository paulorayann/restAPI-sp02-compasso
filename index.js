const customExpress = require('./config/customExpress')
const connection = require('./database/connection')

connection.connect(err => {
    if(err) {
        console.log(err)
    } else {
        console.log('Connected Succesfully')
        const app = customExpress()

        app.listen(3000, () => console.log('Running on port 3000'))

    }

})

