let canvas = document.getElementById('canvas');
tablero = canvas.getContext('2d');

const TABLERO = [];

const LETRAS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","V","W","X","Y","Z"];
const PIEZAS_NEGRAS = ['♟', '♜', '♞', '♝', '♛', '♚'];
const PIEZAS_BLANCAS = ['♙', '♖', '♘', '♗', '♕', '♔'];

let numColumnas = 0;
let numFilas = 0;
let listLetras = [];

//--------> VALIDACIONES [CREACIÓN DE TABLERO] <--------//

while(numColumnas < 8 || numColumnas%2 != 0 ){
    numColumnas = parseInt(prompt('[ COLUMNAS ]\nDame la cantidad de COLUMNAS del TABLERO.\nEl numero minimo es 8  y debe ser par.'));
}
while(numFilas < 4 || numFilas%2 != 0){
    numFilas = parseInt(prompt('[ FILAS ]\nDame la cantidad de FILAS del TABLERO.\nEl numero minimo es 4 y debe ser par.'));
}

// Creacion del array

for(let i = 0; i < numFilas; i++){
    TABLERO[i] = [];
    for(let j = 0; j < numColumnas; j++){

        TABLERO[i][j] = ' ';
        if(i == 0){
            listLetras.push(LETRAS[j]);  //-
        }
        
    }
}

//--------> COLOCAR Y ODENAR FICHAS EN ARRAY <--------//

let posicionI = (TABLERO[1].length - 8) / 2;
let posicionF = posicionI + 8;
let posFicha = 1;

for(let i = posicionI; i < posicionF; i++){
    if(posFicha != 9){
        TABLERO[0][i] = ordenarFichas(posFicha, 'negro'); // Negros
        TABLERO[TABLERO.length-1][i] = ordenarFichas(posFicha, 'blanco'); // Blancos
        posFicha ++;
    }
    // Dibujar peones
    TABLERO[1][i] = ordenarFichas(9, 'negro'); // Negros
    TABLERO[TABLERO.length-2][i] = ordenarFichas(9, 'blanco'); // Blancos
}

function ordenarFichas(posFicha, colorFicha = 'blanca'){
    switch (posFicha) {
        case 9: if(colorFicha == 'negro'){ return '♟'; } return '♙'; //Peón
        case 1: case 8: if(colorFicha == 'negro'){ return '♜'; } return '♖'; //Torre
        case 2: case 7: if(colorFicha == 'negro'){ return '♞'; } return '♘'; //Caballo
        case 3: case 6: if(colorFicha == 'negro'){ return '♝'; } return '♗'; //Alfil
        case 4: if(colorFicha == 'negro'){ return '♛'; } return '♕'; //Dama
        case 5: if(colorFicha == 'negro'){ return '♚'; } return '♔'; //Rey
        default:
    }
}


//--------> IMPRIMIR TABLERO <--------//


console.log(`[${listLetras}]`);
for(index in TABLERO){
    console.log(`[${TABLERO[index]}] ${1 + parseInt(index)}`);
}



//--------> TAMAÑO DEL TABLERO <--------//
let ancho = 50 * numColumnas;
let alto = 50 * numFilas;

canvas.width = ancho;
canvas.height = alto;

//-------------------------------------//

//--------> DIBUJAR CUADRADOS <--------//

for(let i = 0; i < numFilas; i++){
    for(let j = 0; j < numColumnas; j++){
        if((i + j) % 2 == 0){
            cuadradosTablero(50*j, 50*i, 50*(j+1), 50*(i+1), '#fff');
        }else{
            cuadradosTablero(50*j, 50*i, 50*(j+1), 50*(i+1), '#000');
        }
    
    }
}

function cuadradosTablero(ix,iy,fx,fy, color){
    tablero.beginPath();
    tablero.rect(ix, iy, fx, fy);
    tablero.fillStyle = color;
    tablero.fill();
    tablero.closePath();
}
           

//--------> ORDENAR PIEZAS EN PANTALLA <--------//

let piezas = document.getElementById('piezas')

const TABLERO_PIEZAS = [];
let posTop = 0;
let left = 0;

for(let j = 0; j < numFilas; j++){
    TABLERO_PIEZAS[j] = [];
    posTop = j * 50;
    for(let i = 0; i < numColumnas; i++){

        // Crear etiqueta <p>
        TABLERO_PIEZAS[j][i] = document.createElement('p')
        TABLERO_PIEZAS[j][i].className = "pieza";
        piezas.appendChild(TABLERO_PIEZAS[j][i]);
    
        TABLERO_PIEZAS[j][i].innerHTML = TABLERO[j][i];
        TABLERO_PIEZAS[j][i].style.top = posTop + 'px';
        TABLERO_PIEZAS[j][i].style.left = i*50 + 'px';
        
    
        TABLERO_PIEZAS[j][i].addEventListener('click', ()=>{
            hacerMovimiento(j,i,TABLERO_PIEZAS[j][i]);
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

function hacerMovimiento(posFila, posColumna, etiqueta){
    // console.log(posFila,'/',posColumna);
    // let moverFicha = prompt('Haga un movimiento');
    
    // let posColumna = LETRAS.indexOf(moverFicha[0].toUpperCase())
    // console.log(posColumna );
    // let posFila = moverFicha.slice(1,moverFicha.length) - 1;

    // if((posColumna == -1 || posColumna >= numColumnas)  || (posFila < 0 || posFila >= numFilas || isNaN(posFila))){
    //     console.log('Seleccione un campo dentro del tablero');
    //     return hacerMovimiento();
    // }

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
    pieza = TABLERO[pieza.fila][pieza.columna];

    if(turno == 'blanco'){
        piezaEscontrada =  PIEZAS_BLANCAS.indexOf(pieza);
    }else if(turno == 'negro'){
        piezaEscontrada =  PIEZAS_NEGRAS.indexOf(pieza);
    }  

    //No encontro la pieza?
    if(piezaEscontrada == -1){
        errorColorRojo(piezaEscogida,piezasYcampos);
        return console.log(`Selecciona una pieza de color ${turno}`)
    }
    piezaEscogida.pieza = pieza;
    etiqueta.style.backgroundColor = 'aqua';
    return console.log(`pieza seleccionada ${pieza}`)
}


function validarCampo(campo,etiqueta){
    //si da click a la misma pieza una vez mas se deselecciona 
    if(campo.fila == piezaEscogida.fila && campo.columna == piezaEscogida.columna){
        etiqueta.style.backgroundColor = '';
        console.log(`piza deseleccionada ${TABLERO[campo.fila][campo.columna]}`)
        return piezaEscogida.pieza = '';
    }

    if(TABLERO[campo.fila][campo.columna] != ' '){
        errorColorRojo(campoEscogido,piezasYcampos);
        return console.log('Selecciona un campo vacio');
    }

    if(piezaEscogida.pieza == '♞' || piezaEscogida.pieza == '♘'){
        console.log(campo.fila, '/' ,campo.columna);
        let resultado = moverCaballo(campo.fila,campo.columna,piezaEscogida);
        console.log(resultado);
    }
    
    campoEscogido.campo = TABLERO[campo.fila][campo.columna];
    TABLERO_PIEZAS[piezaEscogida.fila][piezaEscogida.columna].style.backgroundColor = '';
    // Función para cambiar posicion de pieza
    return moverPieza(piezaEscogida, campoEscogido);
}



function errorColorRojo(objetoPiezaCampo,clasePiezas){
    TABLERO_PIEZAS[objetoPiezaCampo.fila][objetoPiezaCampo.columna].style.backgroundColor = 'red';
    setTimeout(() => {
        for(const element of clasePiezas){
            if(element.style.backgroundColor != 'aqua'){
                element.style.backgroundColor = '';                
            }
        }
                
        
    }, 500);
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


function moverPieza(pieza, campo){
    TABLERO[campo.fila][campo.columna] = pieza.pieza;
    TABLERO[pieza.fila][pieza.columna] = campo.campo;

    TABLERO_PIEZAS[campo.fila][campo.columna].innerHTML = pieza.pieza; 
    TABLERO_PIEZAS[pieza.fila][pieza.columna].innerHTML = campo.campo; 

    piezaEscogida.pieza = '';
    campoEscogido.campo = '';


    //Cambiar de turno
    if(turno == 'blanco'){
        turno = 'negro';
    }else if(turno == 'negro'){
        turno = 'blanco';
    }
    
}


