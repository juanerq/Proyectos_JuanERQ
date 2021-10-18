import { CONFIG_CHESS, CHESS, CHESS_VIEW, $CHESS_DIV, movePiece } from '../chess.js';
import { changeToFigures } from './other-functions.js';

//--------> ORDENAR PIEZAS EN PANTALLA <--------//

function orderPiecesScreen(){
    CHESS_VIEW.length = 0;
    $CHESS_DIV.innerHTML = '';
    let posTop = 0;
    
    for(let indexRow = 0; indexRow < CONFIG_CHESS.num_rows; indexRow++){

        CHESS_VIEW[indexRow] = [];
        posTop = indexRow * CONFIG_CHESS.size_square;

        for(let indexColumn = 0; indexColumn < CONFIG_CHESS.num_colums; indexColumn++){
            // Crear etiqueta <div> para cada espacio y ficha del tablero
            CHESS_VIEW[indexRow][indexColumn] = document.createElement('div')
            CHESS_VIEW[indexRow][indexColumn].className = "piece";         // Nombre de la clase de cada etiqueta
            $CHESS_DIV.appendChild(CHESS_VIEW[indexRow][indexColumn]);     // adjuntamos la etiqueta hija en la padre id="chess"
        
            // Estilos para ajustar el tamaño de las piesas y cuadros
            CHESS_VIEW[indexRow][indexColumn].style.width = `${CONFIG_CHESS.size_square}px`;
            CHESS_VIEW[indexRow][indexColumn].style.height = `${CONFIG_CHESS.size_square}px`;
            CHESS_VIEW[indexRow][indexColumn].style.fontSize = `${CONFIG_CHESS.size_piece}px`;
            CHESS_VIEW[indexRow][indexColumn].style.lineHeight = `${CONFIG_CHESS.size_square}px`;
    
            // Ingresar fichas y espacios en blanco a la cada etiqueta
            CHESS_VIEW[indexRow][indexColumn].innerHTML = changeToFigures(CHESS[indexRow][indexColumn]);

            // Ingresar posicion (posicion relativa) a cada etiquera 
            CHESS_VIEW[indexRow][indexColumn].style.top = `${posTop}px`
            CHESS_VIEW[indexRow][indexColumn].style.left = `${indexColumn * CONFIG_CHESS.size_square}px`;
    
            CHESS_VIEW[indexRow][indexColumn].addEventListener('click', () => {
                return movePiece(indexRow, indexColumn, CHESS_VIEW[indexRow][indexColumn]);
            })
        }
    }
}

export { orderPiecesScreen };