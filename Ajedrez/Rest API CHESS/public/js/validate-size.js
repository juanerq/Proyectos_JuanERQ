import { HTML_TAGS, CONFIG_CHESS, createGameChess, CHESS } from '../chess.js';
import { putPieces } from './create-chessArray.js';
import { createChessById } from '../fetch/createChessById.js';

let hola = true;
function validate_size_chess(){
   
    let idgame = HTML_TAGS.idgame.value

    if(idgame){
        return createChessById(idgame);
    }

    HTML_TAGS.message_column.innerHTML = '';
    HTML_TAGS.message_row.innerHTML = '';
    if(HTML_TAGS.column_input.value < 8 || HTML_TAGS.column_input.value % 2 != 0 ){
        HTML_TAGS.message_column.innerHTML = 'El numero minimo de columnas es 8 y debe ser par.';
    }
    if(HTML_TAGS.row_input.value < 4 || HTML_TAGS.row_input.value %2 != 0){
        HTML_TAGS.message_row.innerHTML = 'El numero minimo de filas es 4 y debe ser par.';
    }
    
    if(HTML_TAGS.message_column.innerHTML == '' && HTML_TAGS.message_row.innerHTML == '' || idgame){

        CONFIG_CHESS.num_columns = parseInt(HTML_TAGS.column_input.value);
        CONFIG_CHESS.num_rows = parseInt(HTML_TAGS.row_input.value);

        calculateSize();

        HTML_TAGS.row_input.value = "0";
        HTML_TAGS.column_input.value = "0";
        if(hola){
            console.log('createGameChess');
            hola = false;
            return createGameChess();
           
        }
        return putPieces(CHESS);
    }
}

function calculateSize(){
        // Calcular tamaño del tablero dependiendo de la resolución de pantalla, 
        // cantidad de filas y columnas
        if(CONFIG_CHESS.num_rows >= CONFIG_CHESS.num_columns){
            CONFIG_CHESS.size_square = (screen.height - (screen.height * 0.25)) / CONFIG_CHESS.num_rows;
        }else{
            CONFIG_CHESS.size_square = (screen.width - (screen.width * 0.40)) / CONFIG_CHESS.num_columns;
        }
        CONFIG_CHESS.size_piece = CONFIG_CHESS.size_square - (CONFIG_CHESS.size_square * 0.25);
}


export { validate_size_chess, calculateSize };