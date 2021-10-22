import { changeToFigures, printChess, errorColorRed, orderPieces } from './js/other-functions.js';
import { validate_size_chess } from './js/validate-size.js'
import { create_chessArray, putPieces } from './js/create-chessArray.js'
import { sizeChessCanvas } from './js/create-canvas.js';
import { orderPiecesScreen } from './js/order-PiecesScreen.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const submit_size = document.getElementById('submit_size');

const row_input = document.getElementById('row');
const column_input = document.getElementById('column');
const message_column = document.getElementById('message_column');
const message_row = document.getElementById('message_row');

const $CHESS_DIV = document.getElementById('chess')
const $PIECES_DIV = document.getElementsByClassName('piece');

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

let turn = 'white';

const deadPiecesWhite = document.getElementById('dead_pieces_white');
const deadPiecesBlack = document.getElementById('dead_pieces_black');

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
    towerleft: '9',
    knightleft: '9',
    bishopleft: '9',
    queen: '9',
    king: '9',
    bishopright: '9',
    knightright: '9',
    towerright: '9',
    pawns: [3,3,3,3,3,3,3,3]
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
    turn = 'white';
    CHOSEN_PIECE.piece = '';
    GAME_PROGRESS.deadPiecesWhite.length = 0;
    GAME_PROGRESS.deadPiecesBlack.length = 0;
    deadPiecesWhite.innerHTML = '';
    deadPiecesBlack.innerHTML = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createGameChess(){
    cleanChess(CHOSEN_PIECE, ctx);
    create_chessArray(CONFIG_CHESS.num_rows, CONFIG_CHESS.num_columns);
    putPieces(CHESS);
    printChess(listLetter, CHESS, GAME_PROGRESS);
    sizeChessCanvas();
    orderPiecesScreen(CHESS);
}


//--------> MOVER PIEZAS Y VALIDACIONES <--------//

// clases de las piezas (HTML)

function movePiece(posRow, posColumn, selectedTag, CHESS){

    if(CHOSEN_PIECE.piece.length == 0){
        CHOSEN_PIECE.row = posRow;
        CHOSEN_PIECE.column = posColumn;
        return validatePiece(CHESS, CHOSEN_PIECE, selectedTag);
    }

    if(CHOSEN_POSITION.position.length == 0){
        CHOSEN_POSITION.row = posRow;
        CHOSEN_POSITION.column = posColumn;
        return validateChosen();
    }

}


function validatePiece(CHESS, CHOSEN_PIECE, selectedTag){
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

    // Matar pieza
    if(trappedPiece != -1){
        chosenPosition = changeToFigures(chosenPosition);
        if(turn == 'white'){
            GAME_PROGRESS.deadPiecesBlack.push(chosenPosition);
            deadPiecesWhite.innerHTML = GAME_PROGRESS.deadPiecesBlack.join(" ");
        }else{
            GAME_PROGRESS.deadPiecesWhite.push(chosenPosition);
            deadPiecesBlack.innerHTML = GAME_PROGRESS.deadPiecesWhite.join(" ");
        } 
        chosenPosition = '   ';
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

    (turn == 'white') ? updatePositionPieces(POSITION_PIECES_WHITE, pieza, campo) :
    updatePositionPieces(POSITION_PIECES_BLACK, pieza, campo);
    
    

    console.log(POSITION_PIECES_WHITE);
    
    console.log(POSITION_PIECES_BLACK);
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



    const putPositionPieces = async (positionPieces) => {
        try {
            const resPieces = await fetch('/',{
                method: 'PUT',
                body: JSON.stringify(positionPieces),
                headers: { "Content-type": "application/json" }
            })
            const data = await resPieces.json(); 
            console.log(data);
    
        } catch(error) {
            console.log(error);
        }
    }
    putPositionPieces([POSITION_PIECES_BLACK, POSITION_PIECES_WHITE]);


export { canvas, ctx, row_input, column_input, message_column, message_row, $CHESS_DIV, $PIECES_DIV, CONFIG_CHESS, CHESS, CHESS_VIEW, PIECES_BLACK, listLetter,LETTER, PIECES_WHITE, CHOSEN_PIECE, CHOSEN_POSITION, turn, movePiece };
export { POSITION_PIECES_BLACK, POSITION_PIECES_WHITE, clean,ObjectToChess }
export { createGameChess, cleanChess };


