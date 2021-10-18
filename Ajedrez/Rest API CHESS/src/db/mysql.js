// let mysql = require('mysql');
// let CREDENTIALS = require('../config/mysql');

// function connection(){
//     const connection = mysql.createConnection(CREDENTIALS);
//     connection.connect((err) => {
//         if(err) throw err;
//         console.log('Connectado a la base de datos!');
//     });
//     return connection;
// }

// function addPositionPieces(connection, correo,nombre,usuario,celular,hashPass){
//     return new Promise((resolve, reject) =>{
//         connection.query('INSERT INTO pawnblack SET ?', {correo:correo, nomcompleto:nombre, nomuser:usuario, celular:celular, password:hashPass},


//         (err, results) => {
//             if(err){
//                 return reject(err);
//             }
//             return resolve(results)
//         })
//     })
// }