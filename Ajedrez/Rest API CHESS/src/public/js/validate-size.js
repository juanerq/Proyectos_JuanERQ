import { row_input, column_input, message_column, message_row, CONFIG_CHESS, createGameChess } from '../chess.js';

function validate_size_chess(){
   
    message_column.innerHTML = '';
    message_row.innerHTML = '';
    if(column_input.value < 8 || column_input.value % 2 != 0 ){
        message_column.innerHTML = 'El numero minimo de columnas es 8 y debe ser par.';
    }
    if(row_input.value < 4 || row_input.value %2 != 0){
        message_row.innerHTML = 'El numero minimo de filas es 4 y debe ser par.';
    }
    
    if(message_column.innerHTML == '' && message_row.innerHTML == ''){

        CONFIG_CHESS.num_colums = parseInt(column_input.value);
        CONFIG_CHESS.num_rows = parseInt(row_input.value);

        // Calcular tamaño del tablero dependiendo de la resolución de pantalla, 
        // cantidad de filas y columnas
        if(CONFIG_CHESS.num_rows >= CONFIG_CHESS.num_colums){
            CONFIG_CHESS.size_square = (screen.height - (screen.height * 0.25)) / CONFIG_CHESS.num_rows;
        }else{
            CONFIG_CHESS.size_square = (screen.width - (screen.width * 0.40)) / CONFIG_CHESS.num_colums;
        }
        CONFIG_CHESS.size_piece = CONFIG_CHESS.size_square - (CONFIG_CHESS.size_square * 0.25);

        row_input.value = "0";
        column_input.value = "0";
        return createGameChess();
    }
}
export { validate_size_chess };