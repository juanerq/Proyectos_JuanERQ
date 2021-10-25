let db = require('../db/mysql');

let updatePositionPieces = async (req, res) => {
    const connection = db.connection()
    const POSITION_PIECES = req.body;
    console.log(POSITION_PIECES);
    const { idgame } = req.params;
    console.log(idgame);

    db.updatePositionPieces(connection, POSITION_PIECES[1], idgame, 'white').then(resolve =>{
        if(err) return reject(err);
        return res.json({Status: 'Position of Updated Pieces'});
        connection.end()
    }).catch(err => console.log(err))

    db.updatePositionPieces(connection, POSITION_PIECES[0], idgame, 'black').then(resolve =>{
        if(err) return reject(err);
        return res.json({Status: 'Position of Updated Pieces'});
        connection.end()
    }).catch(err => console.log(err))
}

module.exports = {
    updatePositionPieces
}
