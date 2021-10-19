let mysql = require('mysql');
let CREDENTIALS = require('../config/mysql');

function connection(){
    const connection = mysql.createConnection(CREDENTIALS);
    connection.connect((err) => {
        if(err) throw err;
        console.log('Connectado a la base de datos!');
    });
    return connection;
}

function addPositionPieces(connection, objectPieces, color = 'white'){
    return new Promise((resolve, reject) =>{
        connection.query('INSERT INTO pawn'+color+' SET ?', toObject(objectPieces.pawns) , (err, results) => {
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

function getPositionPieces(connection, idgame, color = 'white'){

    return new Promise((resolve, reject) =>{
        connection.query('SELECT pieces'+color+'.*, pawn'+color+'.* FROM game g, pieces'+color+', pawn'+color+' WHERE g.p'+color+'=pieces'+color+'.idp'+color+' and pieces'+color+'.idpawn'+color+'=pawn'+color+'.idpawn'+color+' and g.idgame = ?', idgame, (err, results) => {
            if(err) return reject(err);
            
            return resolve(results)
        })    

    })
}

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[`pawn${i+1}`] = arr[i];
    return rv;
}

module.exports = {
    connection,
    addPositionPieces,
    getPositionPieces
}