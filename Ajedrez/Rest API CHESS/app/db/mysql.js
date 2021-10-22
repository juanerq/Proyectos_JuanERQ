let mysql = require('mysql');
let CREDENTIALS = require('../config/mysql');
const arrayToObject = require('../helpers/arrayToObject-helper')

// Conección a la base de datos
function connection(){
    const connection = mysql.createConnection(CREDENTIALS);
    connection.connect((err) => {
        if(err) throw err;
        console.log('Connectado a la base de datos!');
    });
    return connection;
}

// Añadir posición de las piezas a la base de datos
function addPositionPieces(connection, objectPieces, color = 'white'){
    return new Promise((resolve, reject) =>{
        connection.query('INSERT INTO pawn'+color+' SET ?', arrayToObject(objectPieces.pawns) , (err, results) => {
            if(err) return reject(err);
            
            objectPieces['idpawn'+color] = `${results.insertId}`;
            delete objectPieces['pawns'];

            connection.query('INSERT INTO pieces'+color+' SET ?', objectPieces, (err, results) => {
                if(err) return reject(err);
                
                objectPieces['idp'+color] = `${results.insertId}`;
                return resolve(objectPieces)
            })    
            
        })
    })
}

// Obtener posición de las piezas de la base de datos
function getPositionPieces(connection, idgame, color = 'white'){
    return new Promise((resolve, reject) =>{
        connection.query('SELECT pieces'+color+'.*, pawn'+color+'.* FROM game g, pieces'+color+', pawn'+color+' WHERE g.p'+color+'=pieces'+color+'.idp'+color+' and pieces'+color+'.idpawn'+color+'=pawn'+color+'.idpawn'+color+' and g.idgame = ?', idgame, (err, results) => {
            if(err) return reject(err);
            
            return resolve(results)
        })    

    })
}

module.exports = {
    connection,
    addPositionPieces,
    getPositionPieces
}