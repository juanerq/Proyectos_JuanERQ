// const express = require('express');
// const router = express.Router();
// let db = require('../db/mysql');

// function printChess(piecesBlack, piecesWhite, CHESS, start, finish){
    
//     let posPieces = 1;
//     let posPawn = 9;
//     for(let i = start; i < finish; i++){
//         // Piezas
//         if(posPieces <= 8) CHESS[0][i] = returnPiece(piecesBlack, posPieces);
//         // Peones
//         if(posPawn > 8 && posPawn <= 16) CHESS[1][i] = returnPiece(piecesBlack, posPawn);

//         // Piezas
//         if(posPieces <= 8) CHESS[CHESS.length - 1][i] = returnPiece(piecesWhite, posPieces);
//         // Peones
//         if(posPawn > 8 && posPawn <= 16) CHESS[CHESS.length - 2][i] = returnPiece(piecesWhite, posPawn);
//         posPieces ++; 
//         posPawn ++;
//     }
//     return CHESS
// }

// function returnPiece(pieces, num){
//     let numPiece = 1;
//     for(const element in pieces){
//         if(element != 'idpwhite' && element != 'idpawnwhite' && element != 'idpblack' && element != 'idpawnblack'){
//             if(numPiece == num) return pieces[element]

//             numPiece++;
//         }
        
//     }
// }



// // OBTENER DATOS DE LAS PIEZAS
// // router.get('/:idgame', (req, res) => {
// //     const connection = db.connection()
// //     const { idgame } = req.params;
// //     db.getPositionPieces(connection, idgame, 'black').then(resolve =>{

// //         const piecesBlack = resolve[0]
// //         db.getPositionPieces(connection, idgame, 'white').then(resolve =>{

// //             const piecesWhite = resolve[0]
// //             // let chess2 = printChess(piecesBlack, piecesWhite, CHESS);

// //             res.json({Status: 'Positions Obtained', piecesWhite: piecesWhite, piecesBlack: piecesBlack});
// //         })
// //     })
// // })


// // CREAR NUEVOS DATOS DE PIEZAS (idpieces debe ser 0)
// // router.post('/:idpieces', async (req, res) => {
// //     const connection = db.connection()
// //     const POSITION_PIECES = req.body;

// //         db.addPositionPieces(connection, POSITION_PIECES[1], 'white').then(resolve =>{

// //             db.addPositionPieces(connection, POSITION_PIECES[0], 'black').then(resolve =>{

// //                 connection.query('INSERT INTO game SET ?', {pwhite: POSITION_PIECES[1]['idpwhite'], pblack: POSITION_PIECES[0]['idpblack']}, (err, results) => {
// //                     if(err) return reject(err);
// //                     res.json({Status: 'Saved Pieces Position', idgame: results.insertId});
// //                     // idgame = `${results.insertId}`;
// //                     connection.end()
// //                 }) 

// //             }).catch(err => console.log(err))

// //         }).catch(err => console.log(err))
// // })


// ACTUALIZAR DATOS DE PIEZAS (idpieces debe tener la primatykey del campo a actualizar)
// router.put('/:idpieces', (req, res) => {
//     const {towerleft, knightleft, king, bishopright, knightright,towerright, bishopleft, queen} = req.body;
//     const { idpieces } = req.params;
//     const query = 'CALL piecesPositionAddOrEdit(?,?,?,?,?,?,?,?,?)';
//     connection.query(query, [idpieces, towerleft, knightleft, king, bishopright, knightright, 
// 		towerright, bishopleft, queen], (err, rows, fields) => {
//             if(!err){
//                 res.json({Status: 'Employeed Saved'});
//             }else{
//                 console.log('Error:', err);
//             }
//         })
// })

// module.exports = router; 



// // router.post('/:idpieces', (req, res) => {
// //     // PIECES['idpieces'] = req.body.idpieces;
// //     const { towerleft, knightleft, king, bishopright, knightright,towerright, bishopleft, queen } = req.body;
// //     const { idpieces } = req.params;
// //     const { pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8} = toObject(req.body.pawns);
// //     const query = 'CALL piecesPositionAddOrEdit(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

// //     connection.query(query, [idpieces, towerleft, knightleft, king, bishopright, knightright, 
// // 		towerright, bishopleft, queen, pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8], (err, rows, fields) => {
// //             if(!err){
// //                 res.json({Status: 'Employeed Saved'});
// //             }else{
// //                 console.log('Error:', err);
// //             }
// //         })
// // })