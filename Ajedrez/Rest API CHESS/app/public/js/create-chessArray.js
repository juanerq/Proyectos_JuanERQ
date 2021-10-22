import { CHESS, CONFIG_CHESS, LETTER, listLetter, POSITION_PIECES_BLACK, POSITION_PIECES_WHITE, clean, ObjectToChess } from '../chess.js';
import { orderPieces } from './other-functions.js';

let idgame;
//--------> CREAR ARRAY DEL TABLERO <--------//

function create_chessArray(sizeRows, sizeColumns){
    if(!idgame){
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
    }
}

    

//--------> COLOCAR Y ODENAR FICHAS EN ARRAY <--------//

function putPieces(CHESS){
    let posStart = (CONFIG_CHESS.num_columns - 8) / 2;
    let posFinish = posStart + 8;
    let posPieces = 1;
    // CHESS = CHESS_EMPTY.slice();

    if(idgame){
        const getPositionPieces = async (idgame) => {
            try {
                const resPieces = await fetch('/'+idgame,{
                    method: 'GET',
                    headers: { "Content-type": "application/json" }
                })
                const data = await resPieces.json(); 
                console.log(data);
                clean();               
                ObjectToChess(data.piecesBlack, 'black');
                ObjectToChess(data.piecesWhite, 'white');

            } catch (error) {
                console.log(error);
            }
        }
        return getPositionPieces(idgame); 
    }
    

    for(let i = posStart; i < posFinish; i++){
        if(posPieces != 9){
            CHESS[0][i] = orderPieces(posPieces, 'black'); // Negros
            POSITION_PIECES_BLACK[Object.keys(POSITION_PIECES_BLACK)[posPieces-1]] = `0,${i}`;

            CHESS[CONFIG_CHESS.num_rows-1][i] = orderPieces(posPieces, 'white'); // Blancos
            POSITION_PIECES_WHITE[Object.keys(POSITION_PIECES_WHITE)[posPieces-1]] = `${CONFIG_CHESS.num_rows-1},${i}`;

            posPieces ++;
        }
        // Dibujar peones
        CHESS[1][i] = orderPieces(9, 'black'); // Negros
        POSITION_PIECES_BLACK['pawns'][posPieces-2] = `1,${i}`

        CHESS[CONFIG_CHESS.num_rows-2][i] = orderPieces(9, 'white'); // Blancos
        POSITION_PIECES_WHITE['pawns'][posPieces-2] = `${CONFIG_CHESS.num_rows-2},${i}`
    }

    return postPositionPieces([POSITION_PIECES_BLACK, POSITION_PIECES_WHITE]);
    // postPositionPieces(POSITION_PIECES_WHITE);
}


// function postPositionPieces(positionPieces){
//     return fetch('/',{
//         method: 'POST',
//         body: JSON.stringify(positionPieces),
//         headers: { "Content-type": "application/json" }
//     })
//     .then(response => response.json())
//     .then(data => {
//         // idgame = data.idgame;
//         idgame = data.idgame;
//         console.log(data.Status);
//     })

// }

const postPositionPieces = async (positionPieces) => {
    try {
        const resPieces = await fetch('/',{
            method: 'POST',
            body: JSON.stringify(positionPieces),
            headers: { "Content-type": "application/json" }
        })
        const data = await resPieces.json(); 
        idgame = data.idgame;
        console.log(data.data);

    } catch(error) {
        console.log(error);
    }
}





export { create_chessArray, putPieces }