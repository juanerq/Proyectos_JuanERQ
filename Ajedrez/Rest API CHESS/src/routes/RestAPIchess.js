const express = require('express');
const router = express.Router();

let mysql = require('mysql');
let CREDENTIALS = require('../config/mysql');


const connection = mysql.createConnection(CREDENTIALS);
connection.connect((err) => {
    if(err) throw err;
    console.log('Connectado a la base de datos!');
});



// import { PIECES_BLACK, PIECES_WHITE } from'./js/create-chessArray.js';
const PIECES_BLACK = {
    towerleft: '0,0',
    knightleft: '0,1',
    bishopleft: '0,2',
    king: '0,3',
    queen: '0,4',
    bishopright: '0,5',
    knightright: '0,6',
    towerright: '0,7',
    pawns: ['1,0','1,1','1,2','1,3','1,4','1,5','1,6','1,7']
}

function printChess(piecesBlack, piecesWhite){
    
    let posPieces = 1;
    let posPawn = 9;
    for(let i = 0; i < CHESS[0].length; i++){
        // Piezas
        if(posPieces <= 8) CHESS[0][i] = returnPiece(piecesBlack, posPieces);
        // Peones
        if(posPawn > 8 && posPawn <= 16) CHESS[1][i] = returnPiece(piecesBlack, posPawn);

        // Piezas
        if(posPieces <= 8) CHESS[CHESS.length - 1][i] = returnPiece(piecesWhite, posPieces);
        // Peones
        if(posPawn > 8 && posPawn <= 16) CHESS[CHESS.length - 2][i] = returnPiece(piecesWhite, posPawn);
        posPieces ++; 
    }
    console.log(CHESS);
}

function returnPiece(pieces, num){
    let numPiece = 1;
    for(const element in pieces[0]){
        if(element != 'idpieces' && element != 'idpawn'){
            if(numPiece == num) return pieces[0][element]
            numPiece++;
        }
        
    }
}

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[`pawn${i+1}`] = arr[i];
    return rv;
  }



// OBTENER DATOS DE LAS PIEZAS
router.get('/:idpieces', (req, res) => {
    const { idpieces } = req.params;
    connection.query('SELECT * FROM pieces pc, pawn pw WHERE pc.idpawn = pw.idpawn and pc.idpieces = ?', [idpieces], (err, rows, fields) => {
        
        if(!err){
            printChess(rows, rows)
            return res.json(rows);
        }else{
            console.log('Error:', err);
        }
        
    })
})



// CREAR NUEVOS DATOS DE PIEZAS (idpieces debe ser 0)
// router.post('/:idpieces', (req, res) => {
//     // PIECES['idpieces'] = req.body.idpieces;
//     const { towerleft, knightleft, king, bishopright, knightright,towerright, bishopleft, queen } = req.body;
//     const { idpieces } = req.params;
//     const { pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8} = toObject(req.body.pawns);
//     const query = 'CALL piecesPositionAddOrEdit(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

//     connection.query(query, [idpieces, towerleft, knightleft, king, bishopright, knightright, 
// 		towerright, bishopleft, queen, pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8], (err, rows, fields) => {
//             if(!err){
//                 res.json({Status: 'Employeed Saved'});
//             }else{
//                 console.log('Error:', err);
//             }
//         })
// })

router.post('/:idpieces', (req, res) => {

    const piecesBlack = req.body;
    piecesBlack['idpieces'] = req.params.idpieces;

    connection.query('INSERT INTO pawn SET ?', toObject(req.body.pawns), (err, rows, fields) => {
            if(!err){
                piecesBlack['idpawn'] = `${rows.insertId}`;
                res.json({Status: 'Employeed Saved'});

                delete piecesBlack['pawns'];

                connection.query('INSERT INTO pieces SET ?', piecesBlack, (err, rows, fields) => {
                    if(!err){
                        res.json({Status: 'Employeed Saved'});
                    }else{
                        console.log('Error:', err);
                    }
                })
            }else{
                console.log('Error:', err);
            }
        })
})


router.post('/:idpieces', (req, res) => {

    const piecesBlack = req.body;
    piecesBlack['idpieces'] = req.params.idpieces;

    connection.query('INSERT INTO pawn SET ?', toObject(req.body.pawns), (err, rows, fields) => {
            if(!err){
                piecesBlack['idpawn'] = `${rows.insertId}`;
                res.json({Status: 'Employeed Saved'});

                delete piecesBlack['pawns'];

                connection.query('INSERT INTO pieces SET ?', piecesBlack, (err, rows, fields) => {
                    if(!err){
                        res.json({Status: 'Employeed Saved'});
                    }else{
                        console.log('Error:', err);
                    }
                })
            }else{
                console.log('Error:', err);
            }
        })
})







// ACTUALIZAR DATOS DE PIEZAS (idpieces debe tener la primatykey del campo a actualizar)
router.put('/:idpieces', (req, res) => {
    const {towerleft, knightleft, king, bishopright, knightright,towerright, bishopleft, queen} = req.body;
    const { idpieces } = req.params;
    const query = 'CALL piecesPositionAddOrEdit(?,?,?,?,?,?,?,?,?)';
    connection.query(query, [idpieces, towerleft, knightleft, king, bishopright, knightright, 
		towerright, bishopleft, queen], (err, rows, fields) => {
            if(!err){
                res.json({Status: 'Employeed Saved'});
            }else{
                console.log('Error:', err);
            }
        })
})

module.exports = router; 
