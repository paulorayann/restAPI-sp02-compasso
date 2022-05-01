class Tables {
    init(connection) {
        this.connection = connection

        this.createUser()
        this.createTasks()
    }

    //Creation of Users
    createUser() {
        const sql = ` 
        CREATE TABLE IF NOT EXISTS Users (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(70) NOT NULL,
        cpf varchar(15) NOT NULL,
        birthDate DATE NOT NULL,
        email varchar(50) NOT NULL,
        password varchar(30) NOT NULL,
        address varchar(200) NOT NULL,
        number varchar(15) NOT NULL,
        complement varchar(60) NOT NULL,
        city varchar(50) NOT NULL,
        state varchar(25) NOT NULL,
        country varchar(55) NOT NULL,
        zipCode varchar(11) NOT NULL,
        PRIMARY KEY (id))
        `

        this.connection.query( sql, err => {
            if(err) {
                console.log(err)
            } else {
                console.log('Users table succesfully created')
            }
        })
    }

    //Creation of Tasks Table
    createTasks() {
        const sql = `
        CREATE TABLE IF NOT EXISTS Tasks ( 
        description varchar(200) NOT NULL,
        date DATETIME NOT NULL, 
        id int,
        CONSTRAINT fk_UserTask FOREIGN KEY (id) REFERENCES Users (id))
        `
        this.connection.query( sql, err => {
            if(err) {
                console.log(err)
            } else {
                console.log('Tasks table succesfully created')
            }
        })
    }
    
}

module.exports = new Tables