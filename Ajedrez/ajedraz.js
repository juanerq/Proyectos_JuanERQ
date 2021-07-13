let tablero = [
    ['T','C','A','D','R','A','C','T'],
    ['P','P','P','P','P','P','P','P'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['p','p','p','p','p','p','p','p'],
    ['t','c','a','d','r','a','c','t'],  ]

//---------------------------------[ IMPRIMIR TABLERO ]----------------------------------//
console.log(1,2,3,4,5,6,7,8);
let letra = ["A","B","C","D","E","F","G","H"];
let indexLetras = 0;

for(index in tablero){
    console.log(`${tablero[index]}  ${letra[indexLetras]}`);
    indexLetras++;
}
//--------------------------------------------------------------------------------------//

let posicionFicha;
let fila;
let columna;
let convertir = (convertir) =>{
    fila = letra.indexOf(convertir[0].toUpperCase());
    columna = parseInt(convertir[1]) - 1;   
}

let fichas = ["p", "t", "c", "a", "d", "r"];
let turno = "Blanco";
let contPrueba = 0;

while(contPrueba < 5){
    let fichaEncontrada = false;
    posicionFicha = prompt("");
    convertir(posicionFicha);
    console.log(posicionFicha, fila, columna);

    if(turno == "Blanco"){
        for(let i = 0; i < fichas.length; i++){
            if(tablero[fila][columna] == fichas[i]){
                turno = "Negro";
                i = fichas.length;
            }
        }
    }else if(turno == "Negro"){
        for(let i = 0; i < fichas.length; i++){
            if(tablero[fila][columna] == fichas[i].toUpperCase()){
                turno = "Blanco";
                i = fichas.length;
            }
        }    
    }

    if(fichaEncontrada){
        contPrueba++;
    }else{

    }    
}



// let posicionEspacio = prompt("");
// convertir(posicionEspacio);
// console.log(fila, columna);

