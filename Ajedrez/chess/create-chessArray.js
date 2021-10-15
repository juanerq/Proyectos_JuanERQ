
import { CHESS, CONFIG_CHESS, LETTER, listLetter } from '../chess.js';
import { orderPieces  } from './other-functions.js';

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

function putPieces(){
    let posStart = (CONFIG_CHESS.num_colums - 8) / 2;
    let posFinish = posStart + 8;
    let posPieces = 1;
    
    for(let i = posStart; i < posFinish; i++){
        if(posPieces != 9){
            CHESS[0][i] = orderPieces(posPieces, 'black'); // Negros
            CHESS[CONFIG_CHESS.num_rows-1][i] = orderPieces(posPieces, 'white'); // Blancos
            posPieces ++;
        }
        // Dibujar peones
        CHESS[1][i] = orderPieces(9, 'black'); // Negros
        CHESS[CONFIG_CHESS.num_rows-2][i] = orderPieces(9, 'white'); // Blancos
    }
}

export { create_chessArray, putPieces };