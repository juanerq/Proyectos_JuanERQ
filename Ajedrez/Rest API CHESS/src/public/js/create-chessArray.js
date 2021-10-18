
import { CHESS, CONFIG_CHESS, LETTER, listLetter } from '../chess.js';
import { orderPieces } from './other-functions.js';

//--------> CREAR ARRAY DEL TABLERO <--------//

function create_chessArray(){
    CHESS.length = 0;
    listLetter.length = 0;
    for(let i = 0; i < CONFIG_CHESS.num_rows; i++){
        CHESS[i] = [];
        for(let j = 0; j < CONFIG_CHESS.num_colums; j++){
    
            CHESS[i][j] = '   ';
            if(i == 0){
                listLetter.push(LETTER[j]);  
            }
            
        }
    }
    
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
    let posStart = (CONFIG_CHESS.num_colums - 8) / 2;
    let posFinish = posStart + 8;
    let posPieces = 1;
    
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

    postPositionPieces(PIECES_BLACK);
    postPositionPieces(PIECES_WHITE);
}

function postPositionPieces(positionPieces){
    fetch('/chess/0',{
        method: 'POST',
        body: JSON.stringify(positionPieces),
        headers: { "Content-type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })

}

export { create_chessArray, putPieces };