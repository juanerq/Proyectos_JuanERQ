
//--------> CAMBIAR LETRAS A FICHAS <--------//

function changeToFigures(array){
    switch (array) {
        case 'B-P': case 'W-P': if(array == 'B-P'){return'♟'} return '♙'
        case 'B-T': case 'W-T': if(array == 'B-T'){return'♜'} return '♖'
        case 'B-H': case 'W-H': if(array == 'B-H'){return'♞'} return '♘'
        case 'B-B': case 'W-B': if(array == 'B-B'){return'♝'} return '♗'
        case 'B-K': case 'W-K': if(array == 'B-K'){return'♛'} return '♕'
        case 'B-Q': case 'W-Q': if(array == 'B-Q'){return'♚'} return '♔'
        default: return ''
    }
}

//--------> IMPRIMIR TABLERO <--------//

function printChess(listLetter, chess){
    console.log(`[${listLetter}]`);
    for(let index in chess){
        console.log(`[${chess[index]}] ${1 + parseInt(index)}`);
    }
}



export { changeToFigures, printChess };

