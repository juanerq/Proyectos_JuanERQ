import { changeToFigures, printChess, ObjectToChess, orderPieces } from './js/other-functions.js';
import { validate_size_chess } from './js/validate-size.js'
import { create_chessArray, putPieces } from './js/create-chessArray.js'
import { sizeChessCanvas } from './js/create-canvas.js';
import { orderPiecesScreen, createLabelsPieces } from './js/order-PiecesScreen.js';
import { updatePositionPieces } from './js/updatePositionPieces.js';

const HTML_TAGS = {
    canvas: document.getElementById('canvas'),
    ctx: canvas.getContext('2d'),
    
    submit_size: document.getElementById('submit_size'),
    
    row_input: document.getElementById('row'),
    column_input: document.getElementById('column'),
    message_column: document.getElementById('message_column'),
    message_row: document.getElementById('message_row'),
    idgame: document.getElementById('idgame'),

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

const socket = io();

socket.on('connect', () => {
    console.log('Conectado');   
});


//El cliente escucha el evento "enviar-pospiezas"
socket.on('enviar-pospiezas', (payload) => {
    Object.assign(POSITION_PIECES_BLACK, payload.posBlack);
    Object.assign(POSITION_PIECES_WHITE, payload.posWhite);

    const piecesBlack = orderObjectPosition(payload.posBlack['pawns'], POSITION_PIECES_BLACK);
    const piecesWhite = orderObjectPosition(payload.posWhite['pawns'], POSITION_PIECES_WHITE);
    
    console.log(piecesBlack);
    console.log(piecesWhite);
    
    GAME_PROGRESS.turn = payload.turn;
    ObjectToChess(piecesBlack, 'black');
    ObjectToChess(piecesWhite, 'white');

    (GAME_PROGRESS.turn == 'white') ? updatePositionPieces(POSITION_PIECES_WHITE, payload.selPiece, payload.selPosition) :
    updatePositionPieces(POSITION_PIECES_BLACK, payload.selPiece, payload.selPosition);

    console.log(CHESS);

})

function orderObjectPosition(arr, object) {
    const newObject = JSON.parse(JSON.stringify(object));
    for (var i = 0; i < arr.length; ++i){
        newObject[`pawn${i+1}`] = arr[i];
    }
    delete newObject['pawns']
    return newObject;
}


// function updatePositionPieces(objectPiece, CHOSEN_PIECE, CHOSEN_POSITION){
//     CHESS[CHOSEN_POSITION.row][CHOSEN_POSITION.column] = CHOSEN_PIECE.piece;
//     CHESS[CHOSEN_PIECE.row][CHOSEN_PIECE.column] = CHOSEN_POSITION.position;

//     CHESS_VIEW[CHOSEN_POSITION.row][CHOSEN_POSITION.column].innerHTML = changeToFigures(CHOSEN_PIECE.piece); 
//     CHESS_VIEW[CHOSEN_PIECE.row][CHOSEN_PIECE.column].innerHTML = changeToFigures(CHOSEN_POSITION.position); 

//     for(const element in objectPiece){
//         if(element != 'pawns'){
//             if(`${CHOSEN_PIECE.row},${CHOSEN_PIECE.column}` == objectPiece[element]){

//                 return objectPiece[element] = `${CHOSEN_POSITION.row},${CHOSEN_POSITION.column}`
//             }
//         }else{
//             objectPiece[element].forEach((value, index) => {
//                 if(`${CHOSEN_PIECE.row},${CHOSEN_PIECE.column}` == objectPiece[element][index]){

//                     return objectPiece[element][index] = `${CHOSEN_POSITION.row},${CHOSEN_POSITION.column}`
//                 }
//             })
//         }
//     }

//     CHOSEN_PIECE.row = 0;
//     CHOSEN_PIECE.column = 0;
//     CHOSEN_PIECE.piece = '';

//     CHOSEN_POSITION.row = 0;
//     CHOSEN_POSITION.column = 0;
//     CHOSEN_POSITION.position = '';
// }





submit_size.addEventListener('click', validate_size_chess);

function clean(){
    for(let i = 0; i < CONFIG_CHESS.num_rows; i++){
        for(let j = 0; j < CONFIG_CHESS.num_columns; j++){
            CHESS[i][j] = '   ';
            CHESS_VIEW[i][j].innerHTML = '';
        } 
    }   
}
// function ObjectToChess(piecesObject, color){

//     let selectPieces = 1;        
//     for(const element in piecesObject){
//         if(element != 'idpwhite' && element != 'idpawnwhite' && element != 'idpblack' && element != 'idpawnblack' && element != 'rows' && element != 'columns'){
//             let pos = piecesObject[element]
//             pos = pos.split(',');
//             CHESS[pos[0]][pos[1]] = orderPieces(selectPieces, color);
//             CHESS_VIEW[pos[0]][pos[1]].innerHTML = changeToFigures(orderPieces(selectPieces, color));
//             if(selectPieces != 9) selectPieces++; 
//         }
//     }
// }

function cleanChess(){
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
    create_chessArray(CONFIG_CHESS.num_rows, CONFIG_CHESS.num_columns, GAME_PROGRESS.idgame);
    putPieces(CHESS);
    printChess(listLetter, CHESS, GAME_PROGRESS);
    sizeChessCanvas();
    createLabelsPieces();
    orderPiecesScreen(CHESS);
}




//----------------------------------[ VALIDACIONES PIEZAS ]--------------------------------------//

function moverCaballo(filaSelec, columnaSelec, posCaballo){
    if(filaSelec == (posCaballo.row - 2) || filaSelec == (posCaballo.row + 2) || 
        columnaSelec == (posCaballo.column - 2) || columnaSelec == (posCaballo.column + 2)){

        if(columnaSelec == (posCaballo.column - 1) || columnaSelec == (posCaballo.column + 1) || 
            filaSelec == (posCaballo.row - 1) || filaSelec == (posCaballo.row + 1)){
                return true;
        }

    }   
    return false; 
}



function validarMovimientoPieza(pieza){
    switch (pieza) {
        case 'B-P': case 'W-P': return logicaPiezas.peon(CHOSEN_POSITION.row, CHOSEN_POSITION.column, CHOSEN_PIECE);
        case 'B-T': case 'W-T': return logicaPiezas.tower(CHOSEN_POSITION.row,CHOSEN_POSITION.column,CHOSEN_PIECE);
        case 'B-H': case 'W-H': return logicaPiezas.caballo(CHOSEN_POSITION.row,CHOSEN_POSITION.column,CHOSEN_PIECE);
        case '♝': case '♗': break;
        case '♛': case '♕': break;
        case '♚': case '♔': break;
        
        default: return true;
    }
}


const logicaPiezas = {
    caballo: (rowSelec, columnSelec, posCaballo) => {
        let correctMove = false;
        for(const rows in CHESS){
            for(const columns in CHESS[rows]){
                let validateChosen = moverCaballo(rows, columns, posCaballo, posCaballo);

                if(validateChosen && CHESS_VIEW[rows][columns].innerHTML.split(" ").join("").length == 0){
                    CHESS_VIEW[rows][columns].style.backgroundColor = 'yellow';

                    if(rowSelec == rows && columnSelec == columns && correctMove == false){
                        correctMove = true;
                    }
                } 
            }
        }
        return correctMove;
    },

    peon: (filaSelec, columnaSelec, posPeon) => {
        if(posPeon.row == 1 || posPeon.row == CHESS.length - 2){
            if(posPeon.piece == 'W-P' && CHESS_VIEW[posPeon.row - 2][posPeon.column].innerHTML.split(" ").join("").length == 0 && CHESS_VIEW[posPeon.row - 1][posPeon.column].innerHTML.split(" ").join("").length == 0){
                CHESS_VIEW[posPeon.row - 2][posPeon.column].style.backgroundColor = 'yellow';
                if(filaSelec == (posPeon.row - 2) && columnaSelec == posPeon.column)
                return true;

            }else if(posPeon.piece == 'B-P' && CHESS_VIEW[posPeon.row + 2][posPeon.column].innerHTML.split(" ").join("").length == 0  && CHESS_VIEW[posPeon.row + 1][posPeon.column].innerHTML.split(" ").join("").length == 0){
                CHESS_VIEW[posPeon.row + 2][posPeon.column].style.backgroundColor = 'yellow';
                if(filaSelec == (posPeon.row + 2) && columnaSelec == posPeon.column) return true;
            }
        }
        if(posPeon.piece == 'W-P' && CHESS_VIEW[posPeon.row - 1][posPeon.column].innerHTML.split(" ").join("").length == 0){
            CHESS_VIEW[posPeon.row - 1][posPeon.column].style.backgroundColor = 'yellow';
            if(filaSelec == (posPeon.row - 1) && columnaSelec == posPeon.column)
            return true;

        }else if(posPeon.piece == 'B-P' && CHESS_VIEW[posPeon.row + 1][posPeon.column].innerHTML.split(" ").join("").length == 0){
            CHESS_VIEW[posPeon.row + 1][posPeon.column].style.backgroundColor = 'yellow';
            if(filaSelec == (posPeon.row + 1) && columnaSelec == posPeon.column) return true;
        }
        
        return false
    },
    
    tower: (rowSelec, columnSelec, posTower) => {   
        for(let i = posTower.row - 1; i >= 0; i--){
            CHESS_VIEW[i][posTower.column].style.backgroundColor = 'yellow';
        }
        // for(let j = columnSelec; j < CHESS[rowSelec].length; j++){
        //     CHESS_VIEW[rowSelec][j].style.backgroundColor = 'yellow';
        // }
        return true;
    }
   

}

export { CONFIG_CHESS, CHESS, CHESS_VIEW, PIECES_BLACK, listLetter,LETTER, PIECES_WHITE, CHOSEN_PIECE, CHOSEN_POSITION, GAME_PROGRESS, HTML_TAGS };
export { POSITION_PIECES_BLACK, POSITION_PIECES_WHITE, clean }
export { createGameChess, cleanChess, updatePositionPieces, validarMovimientoPieza, socket };


