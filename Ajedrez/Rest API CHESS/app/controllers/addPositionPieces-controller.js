let db = require('../db/mysql');

let addPositionPieces = async (req, res) => {
    const connection = db.connection()
    const POSITION_PIECES = req.body;

    db.addPositionPieces(connection, POSITION_PIECES[1], 'white').then(resolve =>{

        db.addPositionPieces(connection, POSITION_PIECES[0], 'black').then(resolve =>{

            connection.query('INSERT INTO game SET ?', {pwhite: POSITION_PIECES[1]['idpwhite'], pblack: POSITION_PIECES[0]['idpblack']}, (err, results) => {
                if(err) return reject(err);
                res.json({Status: 'Saved Pieces Position', idgame: results.insertId});
                // idgame = `${results.insertId}`;
                connection.end()
            }) 

        }).catch(err => console.log(err))

    }).catch(err => console.log(err))
}

module.exports = {
    addPositionPieces
}