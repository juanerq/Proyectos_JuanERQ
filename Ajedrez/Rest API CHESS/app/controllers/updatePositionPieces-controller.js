let db = require('../db/mysql');

let updatePositionPieces = async (req, res) => {
    const connection = db.connection()
    const POSITION_PIECES = req.body;
    console.log(POSITION_PIECES);
    const idpieces  = 570;
    const idpawn  = 570;
   
    db.updatePositionPieces(connection, POSITION_PIECES[1], idpieces, idpawn, 'white').then(resolve =>{
        if(err) return reject(err);
        db.updatePositionPieces(connection, POSITION_PIECES[0], idpieces, idpawn, 'black').then(resolve =>{
            if(err) return reject(err);
            res.json({Status: 'Position of Updated Pieces'});
            connection.end()
        }).catch(err => console.log(err))

    }).catch(err => console.log(err))
}


module.exports = {
    updatePositionPieces
}
