import { CHESS_VIEW, CHESS, HTML_TAGS } from '../chess.js';


//--------> CAMBIAR LETRAS A FICHAS <--------//

function changeToFigures(array){
    switch (array) {
        case 'B-P': case 'W-P': if(array == 'B-P'){return'♟'} return '♙'
        case 'B-T': case 'W-T': if(array == 'B-T'){return'♜'} return '♖'
        case 'B-H': case 'W-H': if(array == 'B-H'){return'♞'} return '♘'
        case 'B-B': case 'W-B': if(array == 'B-B'){return'♝'} return '♗'
        case 'B-Q': case 'W-Q': if(array == 'B-Q'){return'♛'} return '♕'
        case 'B-K': case 'W-K': if(array == 'B-K'){return'♚'} return '♔'
        default: return ''
    }
}

//--------> ORDENAS PIEZAS <--------//

function orderPieces(posPieces, colorPiece = 'white'){
    switch (posPieces) {
        case 9:          if(colorPiece == 'black') return 'B-P';  return 'W-P'; //Peón
        case 1: case 8:  if(colorPiece == 'black') return 'B-T';  return 'W-T'; //Torre
        case 2: case 7:  if(colorPiece == 'black') return 'B-H';  return 'W-H'; //Caballo
        case 3: case 6:  if(colorPiece == 'black') return 'B-B';  return 'W-B'; //Alfil
        case 4:          if(colorPiece == 'black') return 'B-Q';  return 'W-Q'; //Dama
        case 5:          if(colorPiece == 'black') return 'B-K';  return 'W-K'; //Rey
        default:
    }
}

//--------> IMPRIMIR TABLERO <--------//

function printChess(listLetter, chess, GAME_PROGRESS){
    console.log(`[${listLetter}]`);
    for(let index in chess){
        console.log(`[${chess[index]}] ${1 + parseInt(index)}`);
    }
    console.log(`[ Fichas comidad ]
White => ${GAME_PROGRESS.deadPiecesWhite} 
Black => ${GAME_PROGRESS.deadPiecesBlack}`);
}

//--------> VISUALIZAR ( COLOR ROJO ) CUANDO NO SE PUEDE SELECCIONA UN CAMPO <--------//

function errorColorRed(posError) {
    CHESS_VIEW[posError.row][posError.column].style.backgroundColor = 'red';
    
    setTimeout(() => {
        for(const element of HTML_TAGS.$PIECES_DIV){
            if(element.style.backgroundColor == 'red'){
                return element.style.backgroundColor = '';;                
            }
        } 
    }, 300);
}

//--------> USAR OBJETETO DE POSITION_PIECES PARA CREAR TABLERO ( ARRAY ) <--------//

function ObjectToChess(piecesObject, color){

    let selectPieces = 1;        
    for(const element in piecesObject){
        if(element != 'idpwhite' && element != 'idpawnwhite' && element != 'idpblack' && element != 'idpawnblack' && element != 'rows' && element != 'columns'){
            let pos = piecesObject[element]
            pos = pos.split(',');
            CHESS[pos[0]][pos[1]] = orderPieces(selectPieces, color);
            CHESS_VIEW[pos[0]][pos[1]].innerHTML = changeToFigures(orderPieces(selectPieces, color));
            if(selectPieces != 9) selectPieces++; 
        }
    }
}

export { changeToFigures, printChess, orderPieces, errorColorRed, ObjectToChess };

