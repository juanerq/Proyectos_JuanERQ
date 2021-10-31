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
        connection.query(`INSERT INTO pawn${color} SET ?`, arrayToObject(objectPieces.pawns) , (err, results) => {
            if(err) return reject(err);
            
            objectPieces[`idpawn${color}`] = `${results.insertId}`;
            delete objectPieces['pawns'];

            connection.query(`INSERT INTO pieces${color} SET ?`, objectPieces, (err, results) => {
                if(err) return reject(err);
                
                objectPieces[`idp${color}`] = `${results.insertId}`;
                return resolve(objectPieces)
            })    
            
        })
    })
}

// Obtener posición de las piezas de la base de datos
function getPositionPieces(connection, idgame, color = 'white'){
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT pieces${color}.*, pawn${color}.*, g.rows, g.columns FROM game g, pieces${color}, pawn${color} WHERE g.p${color}=pieces${color}.idp${color} and pieces${color}.idpawn${color}=pawn${color}.idpawn${color} and g.idgame = ?`, idgame, (err, results) => {

            if(err) return reject(err);   
            return resolve(results)
        })    

    })
}


function updatePositionPieces(connection, objectPieces, idgame, color = 'white'){
    return new Promise((resolve, reject) =>{  
        
        connection.query(`SELECT p.idp${color} as idpieces, p.idpawn${color} as idpawns FROM game g, pieces${color} p WHERE g.p${color} = p.idp${color} and g.idgame = ?`, idgame, (err, results) => {
            if(err) return reject(err);
            let id = results;

            connection.query(`UPDATE pawn${color} SET ? WHERE idpawn${color} = ${id[0].idpawns}`, arrayToObject(objectPieces.pawns), (err, results) => {
                if(err) return reject(err);
    
                delete objectPieces['pawns'];
                connection.query(`UPDATE pieces${color} SET ?  WHERE idp${color}=${id[0].idpieces}`, objectPieces, (err, results) => {
                    if(err) return reject(err);
    
                    return resolve(objectPieces);
                })    
                
            })
            
        })    
    })
}


module.exports = {
    connection,
    addPositionPieces,
    getPositionPieces,
    updatePositionPieces
}