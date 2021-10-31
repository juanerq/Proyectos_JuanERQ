import { orderPiecesScreen, createLabelsPieces } from '../js/order-PiecesScreen.js';
import { CONFIG_CHESS, POSITION_PIECES_BLACK, 
POSITION_PIECES_WHITE, GAME_PROGRESS }           from '../chess.js';
import { sizeChessCanvas }                       from '../js/create-canvas.js';
import { calculateSize }                         from '../js/validate-size.js';
import { create_chessArray }                     from '../js/create-chessArray.js';
import { ObjectToChess }                         from '../js/other-functions.js'

function createChessById(idgame){
    const getPositionPieces = async (idgame) => {
        try {
            const resPieces = await fetch(`/${idgame}`,{
                method: 'GET',
                headers: { "Content-type": "application/json" }
            })
            const data = await resPieces.json(); 
            console.log(data);
            create_chessArray(data.sizeBoard.rows, data.sizeBoard.columns);

            GAME_PROGRESS.idgame     = idgame
            CONFIG_CHESS.num_columns = data.sizeBoard.columns;
            CONFIG_CHESS.num_rows    = data.sizeBoard.rows;

            console.log(GAME_PROGRESS.idgame);

            calculateSize();
            sizeChessCanvas();
            createLabelsPieces();

            ObjectToChess(data.piecesBlack, 'black');
            ObjectToChess(data.piecesWhite, 'white');
            savePiecesPositon(POSITION_PIECES_BLACK, data.piecesBlack)
            savePiecesPositon(POSITION_PIECES_WHITE, data.piecesWhite)

            orderPiecesScreen();

        } catch (error) {
            console.log(error);
        }
    }
    return getPositionPieces(idgame)
}



function savePiecesPositon(object, position){
    Object.keys(object).forEach(obj => {
        Object.keys(position).forEach(pos => {
            if (pos === obj) { 
                object[obj] = position[pos];
            }
        
            if (`pawn${object['pawns'].length+1}` == pos) {
                object['pawns'].push(position[pos])
            }
        });
    });   
}

export { createChessById };