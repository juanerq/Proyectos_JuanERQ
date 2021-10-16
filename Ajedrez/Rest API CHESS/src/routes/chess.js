const express = require('express');
const router = express.Router();

const connection = require('../database/db')

const CHESS = [['','','','','','','',''],
               ['','','','','','','',''],
               ['','','','','','','',''],
               ['','','','','','','',''],
               ['','','','','','','',''],
               ['','','','','','','','']] 


// const PIECES_BLACK = ['B-P', 'B-T', 'B-H', 'B-B', 'B-K', 'W-Q', 'B-B', 'B-H', 'B-T'];
// const PIECES_WHITE = ['W-P', 'W-T', 'W-H', 'W-B', 'W-K', 'W-Q', 'W-B', 'W-H', 'W-T'];
// function changeToFigures(array){
//     switch (array) {
//         case 'B-P': case 'W-P': if(array == 'B-P'){return'♟'} return '♙'
//         case 'B-T': case 'W-T': if(array == 'B-T'){return'♜'} return '♖'
//         case 'B-H': case 'W-H': if(array == 'B-H'){return'♞'} return '♘'
//         case 'B-B': case 'W-B': if(array == 'B-B'){return'♝'} return '♗'
//         case 'B-K': case 'W-K': if(array == 'B-K'){return'♛'} return '♕'
//         case 'B-Q': case 'W-Q': if(array == 'B-Q'){return'♚'} return '♔'
//         default:return ' '
//     }
// }


const PIECES = {
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

function printChess(pieces){
    
    let posPieces = 1;
    let posPawn = 9;
    for(let i = 0; i < CHESS[0].length; i++){
        if(posPieces <= 8) CHESS[0][i] = returnPiece(pieces, posPieces);
        if(posPawn > 8 && posPawn <= 16) CHESS[1][i] = returnPiece(pieces, posPawn);

        if(posPieces <= 8) CHESS[CHESS.length - 1][i] = returnPiece(pieces, posPieces);
        if(posPawn > 8 && posPawn <= 16) CHESS[CHESS.length - 2][i] = returnPiece(pieces, posPawn);
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

// function addPiecesToChess(){
//     for(const i ){

//     }
// }

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[`pawn${i+1}`] = arr[i];
    return rv;
  }

let piecesObject =  toObject(PIECES.pawns)

router.get('/', (req, res) => {
    connection.query('SELECT * FROM pieces', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log('Error:', err);
        }
        
    })
})

// OBTENER DATOS DE LAS PIEZAS
router.get('/:idpieces', (req, res) => {
    const { idpieces } = req.params;
    connection.query('SELECT * FROM pieces pc, pawn pw WHERE pc.idpawn = pw.idpawn and pc.idpieces = ?', [idpieces], (err, rows, fields) => {
        
        if(!err){
            printChess(rows)
            return res.json(rows);
        }else{
            console.log('Error:', err);
        }
        
    })
})



// CREAR NUEVOS DATOS DE PIEZAS (idpieces debe ser 0)
router.post('/:idpieces', (req, res) => {
    // PIECES['idpieces'] = req.body.idpieces;
    const { towerleft, knightleft, king, bishopright, knightright,towerright, bishopleft, queen } = PIECES;
    const { idpieces } = req.params;
    const { pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8} = piecesObject;
    const query = 'CALL piecesPositionAddOrEdit(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

    connection.query(query, [idpieces, towerleft, knightleft, king, bishopright, knightright, 
		towerright, bishopleft, queen, pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8], (err, rows, fields) => {
            if(!err){
                res.json({Status: 'Employeed Saved'});
            }else{
                console.log('Error:', err);
            }
        })
    console.log(PIECES);
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
