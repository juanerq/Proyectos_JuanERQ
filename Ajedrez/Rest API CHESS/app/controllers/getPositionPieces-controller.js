let db = require('../db/mysql');

let getPositionPieces = async(req, res) => {
    const connection = db.connection()
    const { idgame } = req.params;
    db.getPositionPieces(connection, idgame, 'black').then(resolve =>{

        const piecesBlack = resolve[0]
        db.getPositionPieces(connection, idgame, 'white').then(resolve =>{

            const piecesWhite = resolve[0]
            res.json({Status: 'Positions Obtained', piecesWhite: piecesWhite, piecesBlack: piecesBlack});
        })
    })
}

module.exports = {
    getPositionPieces
}