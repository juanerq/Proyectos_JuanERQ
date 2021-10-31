import { CHESS, CHESS_VIEW } from '../chess.js'
import { changeToFigures } from '../js/other-functions.js'

function updatePositionPieces(objectPiece, CHOSEN_PIECE, CHOSEN_POSITION){
    CHESS[CHOSEN_POSITION.row][CHOSEN_POSITION.column] = CHOSEN_PIECE.piece;
    CHESS[CHOSEN_PIECE.row][CHOSEN_PIECE.column] = CHOSEN_POSITION.position;

    CHESS_VIEW[CHOSEN_POSITION.row][CHOSEN_POSITION.column].innerHTML = changeToFigures(CHOSEN_PIECE.piece); 
    CHESS_VIEW[CHOSEN_PIECE.row][CHOSEN_PIECE.column].innerHTML = changeToFigures(CHOSEN_POSITION.position); 

    for(const element in objectPiece){
        if(element != 'pawns'){
            if(`${CHOSEN_PIECE.row},${CHOSEN_PIECE.column}` == objectPiece[element]){

                return objectPiece[element] = `${CHOSEN_POSITION.row},${CHOSEN_POSITION.column}`
            }
        }else{
            objectPiece[element].forEach((value, index) => {
                if(`${CHOSEN_PIECE.row},${CHOSEN_PIECE.column}` == objectPiece[element][index]){

                    return objectPiece[element][index] = `${CHOSEN_POSITION.row},${CHOSEN_POSITION.column}`
                }
            })
        }
    }

    CHOSEN_PIECE.row = 0;
    CHOSEN_PIECE.column = 0;
    CHOSEN_PIECE.piece = '';

    CHOSEN_POSITION.row = 0;
    CHOSEN_POSITION.column = 0;
    CHOSEN_POSITION.position = '';
}

export { updatePositionPieces };