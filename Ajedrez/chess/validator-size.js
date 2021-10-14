import { row_input, column_input, message_column, message_row, $CHESS_DIV, CONFIG_CHESS, CHESS, CHESS_VIEW, createGameChess } from '../ajedrez.js';

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

        CONFIG_CHESS.num_colums = column_input.value;
        CONFIG_CHESS.num_rows = row_input.value;
        row_input.value = "0";
        column_input.value = "0";
        return createGameChess(CONFIG_CHESS, CHESS, CHESS_VIEW, $CHESS_DIV)
    }
}
export { validate_size_chess };