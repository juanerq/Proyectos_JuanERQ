let canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

const CHESS = [];

const LETRAS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","V","W","X","Y","Z"];
const PIECES_BLACK = ['♟', '♜', '♞', '♝', '♛', '♚'];
const PIECES_WHITE = ['♙', '♖', '♘', '♗', '♕', '♔'];


const CONFIG_CHESS = {
    num_colums: 0,
    num_rows: 0,
    size_square: 70,
    color_square1: '#fff',
    color_square2: '#000',
}

let listLetter = [];

//--------> VALIDACIONES [CREACIÓN DE TABLERO] <--------//

while(CONFIG_CHESS.num_colums < 8 || CONFIG_CHESS.num_colums%2 != 0 ){
    CONFIG_CHESS.num_colums = parseInt(prompt('[ COLUMNAS ]\nDame la cantidad de COLUMNAS del TABLERO.\nEl numero minimo es 8 y debe ser par.'));
}
while(CONFIG_CHESS.num_rows < 4 || CONFIG_CHESS.num_rows%2 != 0){
    CONFIG_CHESS.num_rows = parseInt(prompt('[ FILAS ]\nDame la cantidad de FILAS del TABLERO.\nEl numero minimo es 4 y debe ser par.'));
}

// Creacion del array

for(let i = 0; i < CONFIG_CHESS.num_rows; i++){
    CHESS[i] = [];
    for(let j = 0; j < CONFIG_CHESS.num_colums; j++){

        CHESS[i][j] = ' ';
        if(i == 0){
            listLetter.push(LETRAS[j]);  
        }
        
    }
}

//--------> COLOCAR Y ODENAR FICHAS EN ARRAY <--------//

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

function orderPieces(posPieces, colorPiece = 'blanca'){
    switch (posPieces) {
        case 9:             if(colorPiece == 'black') return '♟';  return '♙'; //Peón
        case 1: case 8:     if(colorPiece == 'black') return '♜';  return '♖'; //Torre
        case 2: case 7:     if(colorPiece == 'black') return '♞';  return '♘'; //Caballo
        case 3: case 6:     if(colorPiece == 'black') return '♝';  return '♗'; //Alfil
        case 4:             if(colorPiece == 'black') return '♛';  return '♕'; //Dama
        case 5:             if(colorPiece == 'black') return '♚';  return '♔'; //Rey
        default:
    }
}


//--------> IMPRIMIR TABLERO <--------//

function printChess(listLetter, chess){
    console.log(`[${listLetter}]`);
    for(let index in chess){
        console.log('h');
        console.log(`[${chess[index]}] ${1 + parseInt(index)}`);
    }
}
printChess();



//--------> TAMAÑO DEL TABLERO <--------//
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

function drawSquare(ix,iy,fx,fy, color){
    ctx.beginPath();
    ctx.rect(ix, iy, fx, fy);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
           

//--------> ORDENAR PIEZAS EN PANTALLA <--------//
$CHESS_DIV = document.getElementById('chess')

const TABLERO_PIEZAS = [];
let posTop = 0;
let left = 0;

for(let j = 0; j < CONFIG_CHESS.num_rows; j++){
    TABLERO_PIEZAS[j] = [];
    posTop = j * CONFIG_CHESS.size_square;
    for(let i = 0; i < CONFIG_CHESS.num_colums; i++){
        // Crear etiqueta <p>
        TABLERO_PIEZAS[j][i] = document.createElement('p')
        TABLERO_PIEZAS[j][i].className = "pieza";
        $CHESS_DIV.appendChild(TABLERO_PIEZAS[j][i]);
    
        TABLERO_PIEZAS[j][i].style.width = `${CONFIG_CHESS.size_square}px`;
        TABLERO_PIEZAS[j][i].style.height = `${CONFIG_CHESS.size_square}px`;
        TABLERO_PIEZAS[j][i].style.fontSize = `${CONFIG_CHESS.size_square - 20}px`;
        TABLERO_PIEZAS[j][i].style.lineHeight = `${CONFIG_CHESS.size_square}px`;

        TABLERO_PIEZAS[j][i].innerHTML = CHESS[j][i];
        TABLERO_PIEZAS[j][i].style.top = `${posTop}px`
        TABLERO_PIEZAS[j][i].style.left = `${i*CONFIG_CHESS.size_square}px`;

        TABLERO_PIEZAS[j][i].addEventListener('click', () => {
            movePiece(j,i,TABLERO_PIEZAS[j][i]);
        })
    }
    
}

//--------> MOVER PIEZAS Y VALIDACIONES <--------//

// clases de las piezas (HTML)
let piezasYcampos = document.querySelectorAll('.pieza')
let turno = 'blanco'

const piezaEscogida = {
    fila: 0,
    columna: '',
    pieza: ''
};
const campoEscogido = {
    fila: 0,
    columna: '',
    campo: ''
};

function movePiece(posFila, posColumna, etiqueta){

    if(piezaEscogida.pieza == ''){
        piezaEscogida.fila = posFila;
        piezaEscogida.columna = posColumna
        return validarPieza(piezaEscogida,etiqueta);
    }
    if(campoEscogido.campo == ''){
        campoEscogido.fila = posFila;
        campoEscogido.columna = posColumna
        return validarCampo(campoEscogido,etiqueta);
    }

}


function validarPieza(pieza,etiqueta){
    let piezaEscontrada;
    pieza = CHESS[pieza.fila][pieza.columna];

    if(turno == 'blanco'){
        piezaEscontrada =  PIECES_WHITE.indexOf(pieza);
    }else if(turno == 'negro'){
        piezaEscontrada =  PIECES_BLACK.indexOf(pieza);
    }  

    //No encontro la pieza?
    if(piezaEscontrada == -1){
        errorColorRojo(piezaEscogida,piezasYcampos);
        return console.log(`Selecciona una pieza de color ${turno}`)
    }
    piezaEscogida.pieza = pieza;
    etiqueta.style.backgroundColor = 'aqua';

    validarMovimientoPieza(pieza);

    return console.log(`pieza seleccionada ${pieza}`)
}


function validarCampo(campo,etiqueta){
    //si da click a la misma pieza una vez mas se deselecciona 
    let campoSeleccionado = CHESS[campo.fila][campo.columna];

    if(campo.fila == piezaEscogida.fila && campo.columna == piezaEscogida.columna){
        piezasYcampos.forEach(element => {
            element.style.backgroundColor = '';    
        })
        console.log(`piza deseleccionada ${campoSeleccionado}`)
        return piezaEscogida.pieza = '';
    }


    if(campoSeleccionado != ' '){
        errorColorRojo(campoEscogido,piezasYcampos);
        return console.log('Selecciona un campo vacio');
    }

    let resultado = validarMovimientoPieza(piezaEscogida.pieza);
    if(resultado == false){
        errorColorRojo(campoEscogido,piezasYcampos);
        return console.log(`El movimiento no es valido para esta pieza ${piezaEscogida.pieza}`);

    }
    
    campoEscogido.campo = campoSeleccionado;
    TABLERO_PIEZAS[piezaEscogida.fila][piezaEscogida.columna].style.backgroundColor = '';
    // Función para cambiar posicion de pieza
    return moverPieza(piezaEscogida, campoEscogido);
}

function moverPieza(pieza, campo){
    CHESS[campo.fila][campo.columna] = pieza.pieza;
    CHESS[pieza.fila][pieza.columna] = campo.campo;

    TABLERO_PIEZAS[campo.fila][campo.columna].innerHTML = pieza.pieza; 
    TABLERO_PIEZAS[pieza.fila][pieza.columna].innerHTML = campo.campo; 

    piezaEscogida.fila = 0;
    campoEscogido.columna = 0;
    piezaEscogida.pieza = '';
    campoEscogido.campo = '';

    printChess(listLetter, CHESS);
    //Cambiar de turno
    if(turno == 'blanco'){
        turno = 'negro';
    }else if(turno == 'negro'){
        turno = 'blanco';
    }
    
}










function moverCaballo(filaSelec, columnaSelec, posCaballo){
    if(filaSelec == (posCaballo.fila - 2) || filaSelec == (posCaballo.fila + 2) || 
        columnaSelec == (posCaballo.columna - 2) || columnaSelec == (posCaballo.columna + 2)){

        if(columnaSelec == (posCaballo.columna - 1) || columnaSelec == (posCaballo.columna + 1) || 
            filaSelec == (posCaballo.fila - 1) || filaSelec == (posCaballo.fila + 1)){
                return true;
        }

    }   
    return false; 
}




// 
function validarMovimientoPieza(pieza){
    switch (pieza) {
        case '♟': case '♙': return logicaPiezas.peon(campoEscogido.fila, campoEscogido.columna, piezaEscogida);
        case '♜': case '♖': break;
        case '♞': case '♘': return logicaPiezas.caballo(campoEscogido.fila,campoEscogido.columna,piezaEscogida);
        case '♝': case '♗': break;
        case '♛': case '♕': break;
        case '♚': case '♔': break;
        
        default: break;
    }
}


const logicaPiezas = {
    caballo: (filaSelec, columnaSelec, posCaballo) => {
        // if(filaSelec == (posCaballo.fila - 2) || filaSelec == (posCaballo.fila + 2) || 
        // columnaSelec == (posCaballo.columna - 2) || columnaSelec == (posCaballo.columna + 2)){

        //     if(columnaSelec == (posCaballo.columna - 1) || columnaSelec == (posCaballo.columna + 1) || 
        //         filaSelec == (posCaballo.fila - 1) || filaSelec == (posCaballo.fila + 1)){
        //         return true;
        //     }
        // }
        const camposValidos = [];
        let valido = false;
        camposValidos.push([(posCaballo.fila - 2), (posCaballo.columna) + 1],
                           [(posCaballo.fila - 2), (posCaballo.columna) - 1],
                           [(posCaballo.fila + 2), (posCaballo.columna) + 1],
                           [(posCaballo.fila + 2), (posCaballo.columna) - 1],
                           
                           [(posCaballo.fila) + 1,(posCaballo.columna - 2)],
                           [(posCaballo.fila) - 1,(posCaballo.columna - 2)],
                           [(posCaballo.fila) + 1,(posCaballo.columna + 2)],
                           [(posCaballo.fila) - 1,(posCaballo.columna + 2)])


        camposValidos.forEach(element => {
            // Las posiciones deben estar dentro del tablero para pintarlas y validarlas
            if(element[0] >= 0 && element[0] < CONFIG_CHESS.num_rows && element[1] >= 0 && element[1] < CONFIG_CHESS.num_colums){
                // Pintar campos validos del Caballo
                if(TABLERO_PIEZAS[element[0]][element[1]].innerHTML == " "){
                    TABLERO_PIEZAS[element[0]][element[1]].style.backgroundColor = 'yellow';
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
            piezasYcampos.forEach(element => {
                element.style.backgroundColor = '';  
            })
            return valido
        }
        return valido; 
    },


    peon: (filaSelec, columnaSelec, posPeon) => {
        if(posPeon.fila == 1 || posPeon.fila == CHESS.length - 2){
            if(posPeon.pieza == '♙' && filaSelec == (posPeon.fila - 2) && columnaSelec == posPeon.columna) return true;
            if(posPeon.pieza == '♟' && filaSelec == (posPeon.fila + 2) && columnaSelec == posPeon.columna) return true;
        }
            if(posPeon.pieza == '♙' && filaSelec == (posPeon.fila - 1) && columnaSelec == posPeon.columna) return true;
            if(posPeon.pieza == '♟' && filaSelec == (posPeon.fila + 1) && columnaSelec == posPeon.columna) return true;

        return false
    }

}


function errorColorRojo(objetoPiezaCampo,clasePiezas){
    TABLERO_PIEZAS[objetoPiezaCampo.fila][objetoPiezaCampo.columna].style.backgroundColor = 'red';
    setTimeout(() => {
        for(const element of clasePiezas){
            if(element.style.backgroundColor == 'red'){
                element.style.backgroundColor = '';                
            }
        }
                
        
    }, 500);
}