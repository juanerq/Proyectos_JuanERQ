// const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'sistemas65123',
//     database : 'chess'
// });

// connection.connect((err) => {
//     if(err) throw err
//     console.log('Connected to MySQL Server!');
// });

// module.exports = connection;


const CREDENTIALS ={
    host     : 'localhost',
    user     : 'root',
    password : 'sistemas65123',
    database : 'chess'
}

module.exports = CREDENTIALS;