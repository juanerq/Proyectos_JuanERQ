import { changeToFigures, printChess, errorColorRed } from './chess/other-functions.js';
import { validate_size_chess } from './chess/validate-size.js'
import { create_chessArray, putPieces } from './chess/create-chessArray.js'
import { sizeChessCanvas } from './chess/create-canvas.js';
import { orderPiecesScreen } from './chess/order-PiecesScreen.js';


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const submit_size = document.getElementById('submit_size');

const row_input = document.getElementById('row');
const column_input = document.getElementById('column');
const message_column = document.getElementById('message_column');
const message_row = document.getElementById('message_row');

const $CHESS_DIV = document.getElementById('chess')
const $PIECES_DIV = document.getElementsByClassName('piece');

const CHESS = [1,2];
const CHESS_VIEW = [];

const LETTER = [" A ", " B "," C "," D "," E "," F "," G "," H "," I "," J "," K "," L "," M "," N "," O "," P "," Q "," R "," S "," T "," V "," W "," X "," Y "," Z "];
const listLetter = [];

const PIECES_BLACK = ['B-P', 'B-T', 'B-H', 'B-B', 'B-K', 'B-Q'];
const PIECES_WHITE = ['W-P', 'W-T', 'W-H', 'W-B', 'W-K', 'W-Q'];


const CONFIG_CHESS = {
    num_colums: 0,
    num_rows: 0,

    size_square: 0,
    size_piece: 0,

    color_square1: '#e1d0eb',
    color_square2: '#735594',
    colorSelectSquare: '#0da2ef'
}

let turn = 'white';

const GAME_PROGRESS = {
    deadPiecesWhite: [],
    deadPiecesBlack: []
}

const CHOSEN_PIECE = {
    row: 0,
    column: 0,
    piece: ''
};
const CHOSEN_POSITION = {
    row: 0,
    column: 0,
    position: ''
};

submit_size.addEventListener('click', validate_size_chess);



function cleanChess(CHOSEN_PIECE, ctx){
    turn = 'white';
    CHOSEN_PIECE.piece = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createGameChess(){
    cleanChess(CHOSEN_PIECE, ctx);
    create_chessArray();
    putPieces(CONFIG_CHESS, CHESS);
    printChess(listLetter, CHESS, GAME_PROGRESS);
    sizeChessCanvas();
    orderPiecesScreen();
}


//--------> MOVER PIEZAS Y VALIDACIONES <--------//

// clases de las piezas (HTML)

function movePiece(posRow, posColumn, selectedTag){

    if(CHOSEN_PIECE.piece.length == 0){
        CHOSEN_PIECE.row = posRow;
        CHOSEN_PIECE.column = posColumn;
        return validatePiece(CHOSEN_PIECE, selectedTag);
    }

    if(CHOSEN_POSITION.position.length == 0){
        CHOSEN_POSITION.row = posRow;
        CHOSEN_POSITION.column = posColumn;
        return validateChosen();
    }

}


function validatePiece(CHOSEN_PIECE, selectedTag){
    let piezaEscontrada;
    let pieza = CHESS[CHOSEN_PIECE.row][CHOSEN_PIECE.column];
    if(turn == 'white'){
        piezaEscontrada =  PIECES_WHITE.indexOf(pieza);
    }else if(turn == 'black'){
        piezaEscontrada =  PIECES_BLACK.indexOf(pieza);
    }  

    //No encontro la pieza?
    if(piezaEscontrada == -1){
        console.log(`Selecciona una pieza de color ${turn}`)
        return errorColorRed(CHOSEN_PIECE);
         
    }
    CHOSEN_PIECE.piece = pieza;
    selectedTag.style.backgroundColor = CONFIG_CHESS.colorSelectSquare;
    validarMovimientoPieza(pieza);

    return console.log(`pieza seleccionada ${pieza}`)
}


function validateChosen(){
    
    let chosenPosition = CHESS[CHOSEN_POSITION.row][CHOSEN_POSITION.column];

    // si da click a la misma pieza una vez mas se deseleccionara
    if(CHOSEN_POSITION.row == CHOSEN_PIECE.row && CHOSEN_POSITION.column == CHOSEN_PIECE.column){
        // Se quita el color(cualquier color) de todos los campos
        for(const element of $PIECES_DIV){
            element.style.backgroundColor = '';    
        }
        console.log(`piza deseleccionada ${chosenPosition}`);
        // Se borra la piesa seleccionada
        return CHOSEN_PIECE.piece = '';
    }

    let trappedPiece = (turn == 'black') ? PIECES_WHITE.indexOf(chosenPosition) :
                       (turn == 'white') ? PIECES_BLACK.indexOf(chosenPosition) :
                                            
    console.log(trappedPiece);
    if(chosenPosition.split(" ").join("").length != 0 && trappedPiece == -1){
        console.log('Selecciona un campo vacio');
        return errorColorRed(CHOSEN_POSITION);
    }

    let resultado = validarMovimientoPieza(CHOSEN_PIECE.piece);
    if(!resultado){
        console.log(`El movimiento no es valido para esta pieza ${CHOSEN_PIECE.piece}`);
        return errorColorRed(CHOSEN_POSITION);

    }

    // Matar piesa
    if(trappedPiece != -1){
        chosenPosition = changeToFigures(chosenPosition);
        (turn == 'white') ? GAME_PROGRESS.deadPiecesBlack.push(chosenPosition) : GAME_PROGRESS.deadPiecesWhite.push(chosenPosition);
        chosenPosition = '';
    }

    CHOSEN_POSITION.position = chosenPosition;
    CHESS_VIEW[CHOSEN_PIECE.row][CHOSEN_PIECE.column].style.backgroundColor = '';
    // Función para cambiar posicion de pieza
    return moverPieza(CHOSEN_PIECE, CHOSEN_POSITION);
}



function moverPieza(pieza, campo){
    CHESS[campo.row][campo.column] = pieza.piece;
    CHESS[pieza.row][pieza.column] = campo.position;

    CHESS_VIEW[campo.row][campo.column].innerHTML = changeToFigures(pieza.piece); 
    CHESS_VIEW[pieza.row][pieza.column].innerHTML = changeToFigures(campo.position); 

    CHOSEN_PIECE.row = 0;
    CHOSEN_POSITION.column = 0;
    CHOSEN_PIECE.piece = '';
    CHOSEN_POSITION.position = '';


    printChess(listLetter, CHESS, GAME_PROGRESS);
    //Cambiar de turno
    if(turn == 'white'){
        turn = 'black';
    }else if(turn == 'black'){
        turn = 'white';
    }
    
}





// function moverCaballo(filaSelec, columnaSelec, posCaballo){
//     if(filaSelec == (posCaballo.row - 2) || filaSelec == (posCaballo.row + 2) || 
//         columnaSelec == (posCaballo.column - 2) || columnaSelec == (posCaballo.column + 2)){

//         if(columnaSelec == (posCaballo.column - 1) || columnaSelec == (posCaballo.column + 1) || 
//             filaSelec == (posCaballo.row - 1) || filaSelec == (posCaballo.row + 1)){
//                 return true;
//         }

//     }   
//     return false; 
// }




// 
function validarMovimientoPieza(pieza){
    switch (pieza) {
        case 'B-P': case 'W-P': return logicaPiezas.peon(CHOSEN_POSITION.row, CHOSEN_POSITION.column, CHOSEN_PIECE);
        case '♜': case '♖': break;
        case 'B-H': case 'W-H': return logicaPiezas.caballo(CHOSEN_POSITION.row,CHOSEN_POSITION.column,CHOSEN_PIECE);
        case '♝': case '♗': break;
        case '♛': case '♕': break;
        case '♚': case '♔': break;
        
        default: return true;
    }
}


const logicaPiezas = {
    caballo: (filaSelec, columnaSelec, posCaballo) => {
        const camposValidos = [];
        let valido = false;
        camposValidos.push([(posCaballo.row - 2), (posCaballo.column) + 1],
                           [(posCaballo.row - 2), (posCaballo.column) - 1],
                           [(posCaballo.row + 2), (posCaballo.column) + 1],
                           [(posCaballo.row + 2), (posCaballo.column) - 1],
                           
                           [(posCaballo.row) + 1,(posCaballo.column - 2)],
                           [(posCaballo.row) - 1,(posCaballo.column - 2)],
                           [(posCaballo.row) + 1,(posCaballo.column + 2)],
                           [(posCaballo.row) - 1,(posCaballo.column + 2)])


        camposValidos.forEach(element => {
            // Las posiciones deben estar dentro del tablero para pintarlas y validarlas
            if(element[0] >= 0 && element[0] < CONFIG_CHESS.num_rows && element[1] >= 0 && element[1] < CONFIG_CHESS.num_colums){
                // Pintar campos validos del Caballo
                if(CHESS_VIEW[element[0]][element[1]].innerHTML.split(" ").join("") .length == 0){
                    CHESS_VIEW[element[0]][element[1]].style.backgroundColor = 'yellow';
                }
            }
        });

        camposValidos.forEach(element => {
            // Validar si el campo elegido es correcto
            if(filaSelec == element[0] && columnaSelec == element[1]){
                valido = true;
            }
        });
        if(valido){
            for(const element of $PIECES_DIV){
                element.style.backgroundColor = '';    
            }
            return valido
        }
        return valido; 
    },


    peon: (filaSelec, columnaSelec, posPeon) => {
        if(posPeon.row == 1 || posPeon.row == CHESS.length - 2){
            if(posPeon.piece == 'W-P' && filaSelec == (posPeon.row - 2) && columnaSelec == posPeon.column) return true;
            if(posPeon.piece == 'B-P' && filaSelec == (posPeon.row + 2) && columnaSelec == posPeon.column) return true;
        }
            if(posPeon.piece == 'W-P' && filaSelec == (posPeon.row - 1) && columnaSelec == posPeon.column) return true;
            if(posPeon.piece == 'B-P' && filaSelec == (posPeon.row + 1) && columnaSelec == posPeon.column) return true;

        return false
    }
   

}




export { canvas, ctx, row_input, column_input, message_column, message_row, $CHESS_DIV, $PIECES_DIV, CONFIG_CHESS, CHESS, CHESS_VIEW, PIECES_BLACK, listLetter,LETTER, PIECES_WHITE, CHOSEN_PIECE, CHOSEN_POSITION, turn, movePiece };
export { createGameChess };