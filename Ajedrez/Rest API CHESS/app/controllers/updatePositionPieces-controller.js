let db = require('../model/mysql');

let updatePositionPieces = async (req, res) => {
    const connection = db.connection()
    const POSITION_PIECES = req.body;
    const { idgame } = req.params;

    db.updatePositionPieces(connection, POSITION_PIECES[1], idgame, 'white').then(resolve =>{
    }).catch(err => {
        console.log(err)
    })

    db.updatePositionPieces(connection, POSITION_PIECES[0], idgame, 'black').then(resolve =>{
        connection.end()
    }).catch(err => {
        console.log(err)
    })


    return res.json({Status: 'Position of Updated Pieces'});
}

module.exports = {
    updatePositionPieces
}
