import { changeToFigures, printChess, errorColorRed, orderPieces } from './js/other-functions.js';
import { validate_size_chess } from './js/validate-size.js'
import { create_chessArray, putPieces } from './js/create-chessArray.js'
import { sizeChessCanvas } from './js/create-canvas.js';
import { orderPiecesScreen } from './js/order-PiecesScreen.js';

const HTML_TAGS = {
    canvas: document.getElementById('canvas'),
    ctx: canvas.getContext('2d'),
    
    submit_size: document.getElementById('submit_size'),
    
    row_input: document.getElementById('row'),
    column_input: document.getElementById('column'),
    message_column: document.getElementById('message_column'),
    message_row: document.getElementById('message_row'),
    
    $CHESS_DIV: document.getElementById('chess'),
    $PIECES_DIV: document.getElementsByClassName('piece'),

    deadPiecesWhite: document.getElementById('dead_pieces_white'),
    deadPiecesBlack: document.getElementById('dead_pieces_black')
}

const CHESS = [];
const CHESS_VIEW = [];

const LETTER = [" A ", " B "," C "," D "," E "," F "," G "," H "," I "," J "," K "," L "," M "," N "," O "," P "," Q "," R "," S "," T "," V "," W "," X "," Y "," Z "];
const listLetter = [];

const PIECES_BLACK = ['B-P', 'B-T', 'B-H', 'B-B', 'B-K', 'B-Q'];                     
const PIECES_WHITE = ['W-P', 'W-T', 'W-H', 'W-B', 'W-K', 'W-Q'];


const CONFIG_CHESS = {
    num_columns: 0,
    num_rows: 0,

    size_square: 0,
    size_piece: 0,

    color_square1: '#e1d0eb',
    color_square2: '#735594',
    colorSelectSquare: '#0da2ef'
}

// let turn = 'white';

const GAME_PROGRESS = {
    idgame: 0,
    turn: 'white',
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


const POSITION_PIECES_BLACK = {
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

const POSITION_PIECES_WHITE = {
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

function updatePositionPieces(objectPiece, CHOSEN_PIECE, CHOSEN_POSITION){
    for(const element in objectPiece){
        if(element != 'pawns'){
            if(`${CHOSEN_PIECE.row},${CHOSEN_PIECE.column}` == objectPiece[element]){
                console.log(element);
                return objectPiece[element] = `${CHOSEN_POSITION.row},${CHOSEN_POSITION.column}`
            }
        }else{
            objectPiece[element].forEach((value, index) => {
                if(`${CHOSEN_PIECE.row},${CHOSEN_PIECE.column}` == objectPiece[element][index]){
                    console.log(objectPiece[element][index]);
                    return objectPiece[element][index] = `${CHOSEN_POSITION.row},${CHOSEN_POSITION.column}`
                }
            })
        }
    }
}

submit_size.addEventListener('click', validate_size_chess);

function clean(){
    for(let i = 0; i < CONFIG_CHESS.num_rows; i++){
        for(let j = 0; j < CONFIG_CHESS.num_columns; j++){
            CHESS[i][j] = '   ';
            CHESS_VIEW[i][j].innerHTML = '';
        } 
    }   
}
function ObjectToChess(piecesObject, color){
    let selectPieces = 1;        
    for(const element in piecesObject){
        if(element != 'idpwhite' && element != 'idpawnwhite' && element != 'idpblack' && element != 'idpawnblack'){
            let pos = piecesObject[element]
            pos = pos.split(',');
            CHESS[pos[0]][pos[1]] = orderPieces(selectPieces, color);
            CHESS_VIEW[pos[0]][pos[1]].innerHTML = changeToFigures(orderPieces(selectPieces, color));
            if(selectPieces != 9) selectPieces++; 
        }
    }
}

function cleanChess(){
    // turn = 'white';
    CHOSEN_PIECE.piece = '';
    GAME_PROGRESS.turn = 'white';
    GAME_PROGRESS.deadPiecesWhite.length = 0;
    GAME_PROGRESS.deadPiecesBlack.length = 0;
    HTML_TAGS.deadPiecesWhite.innerHTML = '';
    HTML_TAGS.deadPiecesBlack.innerHTML = '';
    HTML_TAGS.ctx.clearRect(0, 0, HTML_TAGS.canvas.width, HTML_TAGS.canvas.height);
}

function createGameChess(){
    cleanChess();
    create_chessArray(CONFIG_CHESS.num_rows, CONFIG_CHESS.num_columns);
    putPieces(CHESS);
    printChess(listLetter, CHESS, GAME_PROGRESS);
    sizeChessCanvas();
    orderPiecesScreen(CHESS);
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
            if(element[0] >= 0 && element[0] < CONFIG_CHESS.num_rows && element[1] >= 0 && element[1] < CONFIG_CHESS.num_columns){
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



 


export { CONFIG_CHESS, CHESS, CHESS_VIEW, PIECES_BLACK, listLetter,LETTER, PIECES_WHITE, CHOSEN_PIECE, CHOSEN_POSITION, GAME_PROGRESS, HTML_TAGS };
export { POSITION_PIECES_BLACK, POSITION_PIECES_WHITE, clean, ObjectToChess }
export { createGameChess, cleanChess, updatePositionPieces };


