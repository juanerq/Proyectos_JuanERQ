import { changeToFigures, printChess } from './chess/other-functions.js';
import { validate_size_chess } from './chess/validator-size.js'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const submit_size = document.getElementById('submit_size');

const row_input = document.getElementById('row');
const column_input = document.getElementById('column');
const message_column = document.getElementById('message_column');
const message_row = document.getElementById('message_row');

const $CHESS_DIV = document.getElementById('chess')
const $PIECES_DIV = document.getElementsByClassName('piece');

let CHESS = [];
let CHESS_VIEW = [];

const LETTER = [" A ", " B "," C "," D "," E "," F "," G "," H "," I "," J "," K "," L "," M "," N "," O "," P "," Q "," R "," S "," T "," V "," W "," X "," Y "," Z "];
let listLetter = [];

const PIECES_BLACK = ['B-P', 'B-T', 'B-H', 'B-B', 'B-K', 'B-Q'];
const PIECES_WHITE = ['W-P', 'W-T', 'W-H', 'W-B', 'W-K', 'W-Q'];


const CONFIG_CHESS = {
    num_colums: 0,
    num_rows: 0,
    size_square: 70,
    color_square1: '#e1d0eb',
    color_square2: '#735594',
    colorSelectSquare: '#0da2ef'
}

let turn = 'white';

const CHOSEN_PIECE = {
    row: 0,
    column: '',
    pieza: ''
};
const CHOSEN_POSITION = {
    row: 0,
    column: '',
    position: ''
};

submit_size.addEventListener('click', validate_size_chess);




//--------> VALIDACIONES [CREACIÓN DE TABLERO] <--------//

// function validate_size_chess(){
   
//     message_column.innerHTML = '';
//     message_row.innerHTML = '';
//     if(column_input.value < 8 || column_input.value % 2 != 0 ){
//         message_column.innerHTML = 'El numero minimo de columnas es 8 y debe ser par.';
//     }
//     if(row_input.value < 4 || row_input.value %2 != 0){
//         message_row.innerHTML = 'El numero minimo de filas es 4 y debe ser par.';
//     }
    
//     if(message_column.innerHTML == '' && message_row.innerHTML == ''){

//         if($CHESS_DIV.innerHTML.length != 0){
//             $CHESS_DIV.innerHTML = '';
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             CHESS = [];
//             CHESS_VIEW = [];
//             turn = 'white';
//         }

//         CONFIG_CHESS.num_colums = column_input.value;
//         CONFIG_CHESS.num_rows = row_input.value;
//         row_input.value = "0";
//         column_input.value = "0";
//         createGameChess(CONFIG_CHESS, CHESS, CHESS_VIEW, $CHESS_DIV)
//         // size_chess.classList.add('none_size_chess')

//     }

// }






// Creacion del array


function createGameChess(CONFIG_CHESS, CHESS, CHESS_VIEW, $CHESS_DIV){
    create_chessArray(CONFIG_CHESS,CHESS);
    putPieces(CONFIG_CHESS, CHESS);
    // printChess(listLetter, CHESS);
    sizeChessCanvas(CONFIG_CHESS, canvas);
    orderPiecesScreen(CONFIG_CHESS, CHESS_VIEW, $CHESS_DIV);

}


function create_chessArray(CONFIG_CHESS){
    CHESS = [];
    for(let i = 0; i < CONFIG_CHESS.num_rows; i++){
        CHESS[i] = [];
        for(let j = 0; j < CONFIG_CHESS.num_colums; j++){
    
            CHESS[i][j] = '   ';
            if(i == 0){
                listLetter.push(LETTER[j]);  
            }
            
        }
    }
    console.log(CHESS);
}
    

//--------> COLOCAR Y ODENAR FICHAS EN ARRAY <--------//

function putPieces(CONFIG_CHESS){
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

function orderPieces(posPieces, colorPiece = 'white'){
    switch (posPieces) {
        case 9:          if(colorPiece == 'black') return 'B-P';  return 'W-P'; //Peón
        case 1: case 8:  if(colorPiece == 'black') return 'B-T';  return 'W-T'; //Torre
        case 2: case 7:  if(colorPiece == 'black') return 'B-H';  return 'W-H'; //Caballo
        case 3: case 6:  if(colorPiece == 'black') return 'B-B';  return 'W-B'; //Alfil
        case 4:          if(colorPiece == 'black') return 'B-K';  return 'W-K'; //Dama
        case 5:          if(colorPiece == 'black') return 'B-Q';  return 'W-Q'; //Rey
        default:
    }
}

// function changeToFigures(array){
//     switch (array) {
//         case 'B-P': case 'W-P': if(array == 'B-P'){return'♟'} return '♙'
//         case 'B-T': case 'W-T': if(array == 'B-T'){return'♜'} return '♖'
//         case 'B-H': case 'W-H': if(array == 'B-H'){return'♞'} return '♘'
//         case 'B-B': case 'W-B': if(array == 'B-B'){return'♝'} return '♗'
//         case 'B-K': case 'W-K': if(array == 'B-K'){return'♛'} return '♕'
//         case 'B-Q': case 'W-Q': if(array == 'B-Q'){return'♚'} return '♔'
//         default: return ''
//     }
// }

// //--------> IMPRIMIR TABLERO <--------//

// function printChess(listLetter, chess){
//     console.log(`[${listLetter}]`);
//     for(let index in chess){
//         console.log(`[${chess[index]}] ${1 + parseInt(index)}`);
//     }
// }




//--------> TAMAÑO DEL TABLERO <--------//

function sizeChessCanvas(CONFIG_CHESS, canvas){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let width = CONFIG_CHESS.size_square * CONFIG_CHESS.num_colums;
    let height = CONFIG_CHESS.size_square * CONFIG_CHESS.num_rows;
    
    canvas.width = width;
    canvas.height = height;
    
    //--------> DIBUJAR CUADRADOS <--------//
    
    for(let i = 0; i < CONFIG_CHESS.num_rows; i++){
        for(let j = 0; j < CONFIG_CHESS.num_colums; j++){
            if((i + j) % 2 == 0){
                drawSquare(CONFIG_CHESS.size_square*j, CONFIG_CHESS.size_square*i, CONFIG_CHESS.size_square*(j+1), CONFIG_CHESS.size_square*(i+1), CONFIG_CHESS.color_square1);
            }else{
                drawSquare(CONFIG_CHESS.size_square*j, CONFIG_CHESS.size_square*i, CONFIG_CHESS.size_square*(j+1), CONFIG_CHESS.size_square*(i+1), CONFIG_CHESS.color_square2);
            }
        
        }
    }
}
    

function drawSquare(ix,iy,fx,fy, color){
    ctx.beginPath();
    ctx.rect(ix, iy, fx, fy);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
           

//--------> ORDENAR PIEZAS EN PANTALLA <--------//

function orderPiecesScreen(CONFIG_CHESS ){
    CHESS_VIEW = []
    $CHESS_DIV.innerHTML = '';
    turn = 'white';
    let posTop = 0;
    
    for(let j = 0; j < CONFIG_CHESS.num_rows; j++){
        CHESS_VIEW[j] = [];
        posTop = j * CONFIG_CHESS.size_square;
        for(let i = 0; i < CONFIG_CHESS.num_colums; i++){
            // Crear etiqueta <p>
            CHESS_VIEW[j][i] = document.createElement('div')
            CHESS_VIEW[j][i].className = "piece";
            $CHESS_DIV.appendChild(CHESS_VIEW[j][i]);
        
            CHESS_VIEW[j][i].style.width = `${CONFIG_CHESS.size_square}px`;
            CHESS_VIEW[j][i].style.height = `${CONFIG_CHESS.size_square}px`;
            CHESS_VIEW[j][i].style.fontSize = `${CONFIG_CHESS.size_square - 20}px`;
            CHESS_VIEW[j][i].style.lineHeight = `${CONFIG_CHESS.size_square}px`;
    
            CHESS_VIEW[j][i].innerHTML = changeToFigures(CHESS[j][i]);
            CHESS_VIEW[j][i].style.top = `${posTop}px`
            CHESS_VIEW[j][i].style.left = `${i*CONFIG_CHESS.size_square}px`;
    
            CHESS_VIEW[j][i].addEventListener('click', () => {
                console.log('gola');
                return movePiece(j,i,CHESS_VIEW[j][i]);
            })
        }
    }
}


//--------> MOVER PIEZAS Y VALIDACIONES <--------//

// clases de las piezas (HTML)

function movePiece(posFila, posColumna, etiqueta){

    if(CHOSEN_PIECE.pieza.length == 0){
        CHOSEN_PIECE.row = posFila;
        CHOSEN_PIECE.column = posColumna
        return validarPieza(CHOSEN_PIECE,etiqueta, CHOSEN_PIECE,$PIECES_DIV);
    }

    if(CHOSEN_POSITION.position.length == 0){
        CHOSEN_POSITION.row = posFila;
        CHOSEN_POSITION.column = posColumna
        return validarCampo(CHOSEN_POSITION,etiqueta);
    }

}


function validarPieza(pieza,etiqueta,CHOSEN_PIECE,$PIECES_DIV){
    let piezaEscontrada;
    pieza = CHESS[pieza.row][pieza.column];
    if(turn == 'white'){
        piezaEscontrada =  PIECES_WHITE.indexOf(pieza);
    }else if(turn == 'black'){
        piezaEscontrada =  PIECES_BLACK.indexOf(pieza);
    }  

    //No encontro la pieza?
    if(piezaEscontrada == -1){
        console.log(`Selecciona una pieza de color ${turn}`)
        return errorColorRojo(CHOSEN_PIECE,$PIECES_DIV);
         
    }
    CHOSEN_PIECE.pieza = pieza;
    etiqueta.style.backgroundColor = CONFIG_CHESS.colorSelectSquare;

    validarMovimientoPieza(pieza);

    return console.log(`pieza seleccionada ${pieza}`)
}


function validarCampo(campo,etiqueta){
    //si da click a la misma pieza una vez mas se deseleccionaRA 
    let campoSeleccionado = CHESS[campo.row][campo.column];

    if(campo.row == CHOSEN_PIECE.row && campo.column == CHOSEN_PIECE.column){
        for(const element of $PIECES_DIV){
            element.style.backgroundColor = '';    
        }
        console.log(`piza deseleccionada ${campoSeleccionado}`)
        return CHOSEN_PIECE.pieza = '';
    }


    if(campoSeleccionado.split(" ").join("").length != 0){
        console.log('Selecciona un campo vacio');
        console.log(CHOSEN_POSITION);
        return errorColorRojo(CHOSEN_POSITION,$PIECES_DIV);
        
    }

    let resultado = validarMovimientoPieza(CHOSEN_PIECE.pieza);
    if(resultado == false){
        errorColorRojo(CHOSEN_POSITION,$PIECES_DIV);
        return console.log(`El movimiento no es valido para esta pieza ${CHOSEN_PIECE.pieza}`);

    }
    
    CHOSEN_POSITION.position = campoSeleccionado;
    CHESS_VIEW[CHOSEN_PIECE.row][CHOSEN_PIECE.column].style.backgroundColor = '';
    // Función para cambiar posicion de pieza
    return moverPieza(CHOSEN_PIECE, CHOSEN_POSITION);
}

function moverPieza(pieza, campo){
    CHESS[campo.row][campo.column] = pieza.pieza;
    CHESS[pieza.row][pieza.column] = campo.position;

    CHESS_VIEW[campo.row][campo.column].innerHTML = changeToFigures(pieza.pieza); 
    CHESS_VIEW[pieza.row][pieza.column].innerHTML = changeToFigures(campo.position); 

    CHOSEN_PIECE.row = 0;
    CHOSEN_POSITION.column = 0;
    CHOSEN_PIECE.pieza = '';
    CHOSEN_POSITION.position = '';

    printChess(listLetter, CHESS);
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
        
        default: break;
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
            if(posPeon.pieza == 'W-P' && filaSelec == (posPeon.row - 2) && columnaSelec == posPeon.column) return true;
            if(posPeon.pieza == 'B-P' && filaSelec == (posPeon.row + 2) && columnaSelec == posPeon.column) return true;
        }
            if(posPeon.pieza == 'W-P' && filaSelec == (posPeon.row - 1) && columnaSelec == posPeon.column) return true;
            if(posPeon.pieza == 'B-P' && filaSelec == (posPeon.row + 1) && columnaSelec == posPeon.column) return true;

        return false
    }

}


function errorColorRojo(objetoPiezaCampo,clasePiezas){
    CHESS_VIEW[objetoPiezaCampo.row][objetoPiezaCampo.column].style.backgroundColor = 'red';
    console.log('hola');
    
    setTimeout(() => {
        for(const element of clasePiezas){
            if(element.style.backgroundColor == 'red'){
                console.log('gola');
                return element.style.backgroundColor = '';                
            }
        }
                
        
    }, 500);
}


export { canvas, ctx, row_input, column_input, message_column, message_row, $CHESS_DIV, $PIECES_DIV, CONFIG_CHESS, CHESS, CHESS_VIEW, PIECES_BLACK, PIECES_WHITE, CHOSEN_PIECE, CHOSEN_POSITION, turn };
export { createGameChess };