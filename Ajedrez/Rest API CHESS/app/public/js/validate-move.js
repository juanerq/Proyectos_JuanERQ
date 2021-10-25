import { CHESS, CONFIG_CHESS, CHOSEN_PIECE, CHESS_VIEW, CHOSEN_POSITION, 
         PIECES_WHITE, PIECES_BLACK, HTML_TAGS, GAME_PROGRESS,
         POSITION_PIECES_WHITE, POSITION_PIECES_BLACK, updatePositionPieces, listLetter} from '../chess.js';
import { changeToFigures, printChess, errorColorRed } from './other-functions.js';

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
    if(GAME_PROGRESS.turn == 'white'){
        piezaEscontrada =  PIECES_WHITE.indexOf(pieza);
    }else if(GAME_PROGRESS.turn == 'black'){
        piezaEscontrada =  PIECES_BLACK.indexOf(pieza);
    }  

    //No encontro la pieza?
    if(piezaEscontrada == -1){
        console.log(`Selecciona una pieza de color ${GAME_PROGRESS.turn}`)
        return errorColorRed(CHOSEN_PIECE);
         
    }
    CHOSEN_PIECE.piece = pieza;
    selectedTag.style.backgroundColor = CONFIG_CHESS.colorSelectSquare;
    // validarMovimientoPieza(pieza);

    return console.log(`pieza seleccionada ${pieza}`)
}


function validateChosen(){
    
    let chosenPosition = CHESS[CHOSEN_POSITION.row][CHOSEN_POSITION.column];

    // si da click a la misma pieza una vez mas se deseleccionara
    if(CHOSEN_POSITION.row == CHOSEN_PIECE.row && CHOSEN_POSITION.column == CHOSEN_PIECE.column){
        // Se quita el color(cualquier color) de todos los campos
        for(const element of HTML_TAGS.$PIECES_DIV){
            element.style.backgroundColor = '';    
        }
        console.log(`pieza deseleccionada ${chosenPosition}`);
        // Se borra la piesa seleccionada
        return CHOSEN_PIECE.piece = '';
    }

    let trappedPiece = (GAME_PROGRESS.turn == 'black') ? PIECES_WHITE.indexOf(chosenPosition) :
                       (GAME_PROGRESS.turn == 'white') ? PIECES_BLACK.indexOf(chosenPosition) :
                                            
    console.log(trappedPiece);
    if(chosenPosition.split(" ").join("").length != 0 && trappedPiece == -1){
        console.log('Selecciona un campo vacio');
        return errorColorRed(CHOSEN_POSITION);
    }

    // let resultado = validarMovimientoPieza(CHOSEN_PIECE.piece);
    // if(!resultado){
    //     console.log(`El movimiento no es valido para esta pieza ${CHOSEN_PIECE.piece}`);
    //     return errorColorRed(CHOSEN_POSITION);

    // }

    // Matar pieza
    if(trappedPiece != -1){
        chosenPosition = changeToFigures(chosenPosition);
        if(GAME_PROGRESS.turn == 'white'){
            GAME_PROGRESS.deadPiecesBlack.push(chosenPosition);
            HTML_TAGS.deadPiecesWhite.innerHTML = GAME_PROGRESS.deadPiecesBlack.join(" ");
        }else{
            GAME_PROGRESS.deadPiecesWhite.push(chosenPosition);
            HTML_TAGS.deadPiecesBlack.innerHTML = GAME_PROGRESS.deadPiecesWhite.join(" ");
        } 
        chosenPosition = '   ';
    }

    CHOSEN_POSITION.position = chosenPosition;
    CHESS_VIEW[CHOSEN_PIECE.row][CHOSEN_PIECE.column].style.backgroundColor = '';
    // Función para cambiar posicion de pieza
    return moverPieza(CHOSEN_PIECE, CHOSEN_POSITION);
}

const putPositionPieces = async (positionPieces, idgame) => {
    try {
        const resPieces = await fetch(`/${GAME_PROGRESS.idgame}`,{
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(positionPieces),
            
        })
        const data = await resPieces.json(); 
        console.log(data);

    } catch(error) {
        console.log(error);
    }
}


function moverPieza(pieza, campo){
    CHESS[campo.row][campo.column] = pieza.piece;
    CHESS[pieza.row][pieza.column] = campo.position;

    CHESS_VIEW[campo.row][campo.column].innerHTML = changeToFigures(pieza.piece); 
    CHESS_VIEW[pieza.row][pieza.column].innerHTML = changeToFigures(campo.position); 

    (GAME_PROGRESS.turn == 'white') ? updatePositionPieces(POSITION_PIECES_WHITE, pieza, campo) :
    updatePositionPieces(POSITION_PIECES_BLACK, pieza, campo);

    console.log(POSITION_PIECES_WHITE, POSITION_PIECES_BLACK);
    putPositionPieces([POSITION_PIECES_BLACK, POSITION_PIECES_WHITE], GAME_PROGRESS.idgame);
    
    console.log(POSITION_PIECES_BLACK);
    CHOSEN_PIECE.row = 0;
    CHOSEN_POSITION.column = 0;
    CHOSEN_PIECE.piece = '';
    CHOSEN_POSITION.position = '';

    printChess(listLetter, CHESS, GAME_PROGRESS);
    //Cambiar de turno
    if(GAME_PROGRESS.turn == 'white'){
        GAME_PROGRESS.turn = 'black';
    }else if(GAME_PROGRESS.turn == 'black'){
        GAME_PROGRESS.turn = 'white';
    }
    
}

export { 
    movePiece,
    validatePiece,
    validateChosen,
    moverPieza    
}