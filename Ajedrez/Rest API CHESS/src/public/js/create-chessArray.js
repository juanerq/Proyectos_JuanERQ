import { CHESS, CONFIG_CHESS, LETTER, listLetter } from '../chess.js';
import { orderPieces } from './other-functions.js';

let idgame = 91;

//--------> CREAR ARRAY DEL TABLERO <--------//

function create_chessArray(sizeRows, sizeColumns){
    CHESS.length = 0;
    listLetter.length = 0;
    for(let i = 0; i < sizeRows; i++){
        CHESS[i] = [];
        for(let j = 0; j < sizeColumns; j++){
    
            CHESS[i][j] = '   ';
            if(i == 0){
                listLetter.push(LETTER[j]);  
            }
            
        }
    }
    // if(!idgame) CHESS_GAME = CHESS.slice();
}
    

//--------> COLOCAR Y ODENAR FICHAS EN ARRAY <--------//

const PIECES_BLACK = {
    towerleft: '',
    knightleft: '',
    bishopleft: '',
    queen: '',
    king: '',
    bishopright: '',
    knightright: '',
    towerright: '',
    pawns: []
}

const PIECES_WHITE = {
    towerleft: '',
    knightleft: '',
    bishopleft: '',
    queen: '',
    king: '',
    bishopright: '',
    knightright: '',
    towerright: '',
    pawns: []
}

function putPieces(){
    let posStart = (CHESS[0].length - 8) / 2;
    // let posStart = (CONFIG_CHESS.num_columns - 8) / 2;
    let posFinish = posStart + 8;
    let posPieces = 1;

    // if(idgame){

    //     fetch('/chess/'+idgame,{
    //         method: 'GET',
    //         headers: { "Content-type": "application/json" }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         create_chessArray(8, 12);
    //         console.log(CHESS);
    //         posStart = (CHESS[0].length - 8) / 2;
    //         posFinish = posStart + 8;
    //         return console.log(printChess(data.piecesBlack,data.piecesWhite, CHESS, posStart, posFinish));
    //     })
    // }
    

    for(let i = posStart; i < posFinish; i++){
        if(posPieces != 9){
            CHESS[0][i] = orderPieces(posPieces, 'black'); // Negros
            PIECES_BLACK[Object.keys(PIECES_BLACK)[posPieces-1]] = `0,${i}`;

            CHESS[CONFIG_CHESS.num_rows-1][i] = orderPieces(posPieces, 'white'); // Blancos
            PIECES_WHITE[Object.keys(PIECES_WHITE)[posPieces-1]] = `${CONFIG_CHESS.num_rows-1},${i}`;

            posPieces ++;
        }
        // Dibujar peones
        CHESS[1][i] = orderPieces(9, 'black'); // Negros
        PIECES_BLACK['pawns'][posPieces-2] = `1,${i}`

        CHESS[CONFIG_CHESS.num_rows-2][i] = orderPieces(9, 'white'); // Blancos
        PIECES_WHITE['pawns'][posPieces-2] = `${CONFIG_CHESS.num_rows-2},${i}`
    }

    postPositionPieces([PIECES_BLACK, PIECES_WHITE]);
    // postPositionPieces(PIECES_WHITE);
}


function postPositionPieces(positionPieces){
    fetch('/chess/0',{
        method: 'POST',
        body: JSON.stringify(positionPieces),
        headers: { "Content-type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        idgame = data.idgame;
        console.log(data.Status);
    })

}



function printChess(piecesBlack, piecesWhite, CHESS, start, finish){
    
    let posPieces = 1;
    let posPawn = 9;
    for(let i = start; i < finish; i++){
        // Piezas
        if(posPieces <= 8) CHESS[0][i] = returnPiece(piecesBlack, posPieces);
        // Peones
        if(posPawn > 8 && posPawn <= 16) CHESS[1][i] = returnPiece(piecesBlack, posPawn);

        // Piezas
        if(posPieces <= 8) CHESS[CHESS.length - 1][i] = returnPiece(piecesWhite, posPieces);
        // Peones
        if(posPawn > 8 && posPawn <= 16) CHESS[CHESS.length - 2][i] = returnPiece(piecesWhite, posPawn);
        posPieces ++; 
        posPawn ++;
    }
    return CHESS
}

function returnPiece(pieces, num){
    let numPiece = 1;
    for(const element in pieces){
        if(element != 'idpwhite' && element != 'idpawnwhite' && element != 'idpblack' && element != 'idpawnblack'){
            if(numPiece == num) return pieces[element]

            numPiece++;
        }
        
    }
}













export { create_chessArray, putPieces };