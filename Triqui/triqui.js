const tablero = [["  ", "  ", "  "]
               , ["  ", "  ", "  "]
               , ["  ", "  ", "  "]];
/*
    1    2    3
A ["X", "O", "X"]
B ["O", "X", "O"]
C ["X", "X", "O"]*/

//funcion para convertir las letras(a,b,c) a numeros(posiciones del array 0,1,2)
const fila = (fila) =>{
    if(fila == 'a' || fila == 'A'){ return 0; }
    else if(fila == 'b' || fila == 'B'){ return 1; }
    else if(fila == 'c' || fila == 'C'){ return 2; }
    else{ return 'error'; }
}

let turno = 1;          //variable para saber si es turno del jugador uno 1 o el 2
let numTurnos = 0;      //variable para saber el numero de jugadas, maximo son 9 
                        //ya que son el numero del espacios que tiene el teblero

//------------------------------[ tablero / posiciones X & O / validación ]-------------------------------// 
while(numTurnos < 9){
   //----------------[ TABLERO ]

    let posicion = prompt(`             1     2     3
        A [ ${tablero[0][0]} ] [ ${tablero[0][1]} ] [ ${tablero[0][2]} ] 
        B [ ${tablero[1][0]} ] [ ${tablero[1][1]} ] [ ${tablero[1][2]} ] 
        C [ ${tablero[2][0]} ] [ ${tablero[2][1]} ] [ ${tablero[2][2]} ] `);
    posicion = posicion.replace(/ /g, ""); //funcion para quitar espacios en blanco

    //objeto donde se transforma la dirección que el usuario digita
    // a una posicion concreta del array multidimensional
    const marcar = {
        //coge el primer caracter(a1) => "a" y lo tranforma en una posicion(a:0, b:1, c:2)
        fila: fila(posicion[0]), 
        //coge el segundo caracter(a1) => "1", lo tranforma en un tipo de dato numerico
        //y le resta uno ya que la primera posicion del array empieza en 0 (1 - 1 = 0)
        columna: parseInt(posicion[1]) - 1, 
        simbolo: "" //variable donde se almacena los simbolos segun el turno del jugador (1:X, 2:O)
    };
    
    //----------------[ POSICIONES: ]
    //1. SI EL CAMPO ESTA LIBRE Y ESTA DENTRO DEL TABLERO

    //condición que permite saber si la posicion escrita por el usuario 
    //disminuye o sobrepasa las que proporciona el cuadro 
    let espacio;
    //si se cumplen estas condiciones quiere decir que esta DENTRO DEL TABLERO
    if(marcar['fila'] != "error" &&                             //DEBE escribir una letra que sea (a,b,c) 
      ((marcar['fila'] < 3 && marcar['columna'] < 3) &&         //DEBE escribir un numero menor que (3) 
      (marcar['fila'] >= 0 && marcar['columna'] >= 0))){        //DEBE escribir un numero mayor o igual a (0)
    //SI SE CUMPLEN la condiciones se guardara el elemento (X, O, " ") de la posicion indicada    
        espacio = tablero[marcar['fila']][marcar['columna']];   
    }else{
    //SI NO SE CUMPLEN se inicializara la variable espacion con una "X", ya que si no entrara a la condición
    //donde se añade el simbolo (X o O) a la posicion que el usuario indico
        espacio = "X";
    }

    //se hace una condicion para saber SI EN EL CAMPO que el usuario ingreso YA EXISTE una X o una O
    if((espacio != "X" && espacio != "O")){
        numTurnos++; //variable para saber el numero de jugadas
        //se pregunta si le toca al jugador (1) o al jugador (2)
        if(turno == 1 ){
            marcar['simbolo'] = "X";
            tablero[marcar['fila']][marcar['columna']] = marcar['simbolo'];
            turno = 2;
        }else if(turno == 2){
            marcar['simbolo'] = "O";
            tablero[marcar['fila']][marcar['columna']] = marcar['simbolo'];
            turno = 1;
        }
    }else{
        //si el CAMPO YA ESTA LLENO o el usuario escribe una DIRECCIÓN INCORRECTA le saldra este mensaje
        alert("Este campo no es valido");
    }

    //se hace esta condicion para EMPEZAR A VALIDAR SI HAY UN GANADOR cuando se HAYAN HECHO 4 JUGADAS
    if(numTurnos > 4){
        let ganador = buscarGanador(); //funcion para buscar el ganador (X o O), 
                                       //este resultado se guardara en una variable

    //Si encuentra un ganador hara que el ciclo termine 
    //inicializando el numero maximo de turnos, y se ejecutara un mensaje: 
    //El tablero con las jugadas y un texto donde indica el ganador 
        if(ganador == 'X'){
            numTurnos = 9;
            alert(`             1     2     3
        A [ ${tablero[0][0]} ] [ ${tablero[0][1]} ] [ ${tablero[0][2]} ]    
        B [ ${tablero[1][0]} ] [ ${tablero[1][1]} ] [ ${tablero[1][2]} ]     Ganador X
        C [ ${tablero[2][0]} ] [ ${tablero[2][1]} ] [ ${tablero[2][2]} ] `);
        }else if(ganador == 'O'){
            numTurnos = 9;
            alert(`             1     2     3
        A [ ${tablero[0][0]} ] [ ${tablero[0][1]} ] [ ${tablero[0][2]} ]    
        B [ ${tablero[1][0]} ] [ ${tablero[1][1]} ] [ ${tablero[1][2]} ]     Ganador O
        C [ ${tablero[2][0]} ] [ ${tablero[2][1]} ] [ ${tablero[2][2]} ] `);
        }else if(numTurnos == 9){
            alert(`             1     2     3
        A [ ${tablero[0][0]} ] [ ${tablero[0][1]} ] [ ${tablero[0][2]} ]    
        B [ ${tablero[1][0]} ] [ ${tablero[1][1]} ] [ ${tablero[1][2]} ]     Empate
        C [ ${tablero[2][0]} ] [ ${tablero[2][1]} ] [ ${tablero[2][2]} ] `);
        }
    }
}
  
//-----------------[ FUNCIÓN PARA HALLAR EL GANADOR ]
function buscarGanador(){
//-----------------[ FORMAS DE GANAR ]-------------------//
/*
      DI: derecha a izquierda             AB: abajo
            1     2     3                1     2     3
        A [ DI ][ DI ][ DI ]        A [ AB ][    ][    ]      
        B [    ][    ][    ]        B [ AB ][    ][    ]      
        C [    ][    ][    ]        C [ AB ][    ][    ]      

      ARIN: arriba, inferior         ABS: abajo, superior
          1       2       3              1      2      3
    A [ ARIN ][      ][      ]      A [     ][     ][ ABS ]
    B [      ][ ARIN ][      ]      B [     ][ ABS ][     ]
    C [      ][      ][ ARIN ]      C [ ABS ][     ][     ]
*/

//objetos donde se guardaran la cantidad de X o O de cada FORMA DE GANAR
    const xPuntos = {xDI:0, xAB:0, xARIN:0, xABS:0}; 
    const oPuntos = {oDI:0, oAB:0, oARIN:0, oABS:0};
    
    //variable para disminuir la poscion(fila) de la forma de ganar ABS
    //ya que es la unica que necesita diminuir
    let i2 = 2;

    //condicion para que se hagan 3 evaluaciones ya que solo hay 3 filas y 3 columnas en el tablero
    for(let i = 0; i < 3; i++){
        //si se encuntra una X o una O en el recorrido se le SUMARA UN 1 A LA FORMA DE GANAR
        //SI LLEGA A 3 es porque estan las tres X o las tres O
        if(tablero[i][i] == 'X'){ xPuntos['xARIN'] += 1 }
        if(tablero[i][i] == 'O'){ oPuntos['oARIN'] += 1 }

        if(tablero[i2][i] == 'X'){ xPuntos['xABS'] += 1 }
        if(tablero[i2][i] == 'O'){ oPuntos['oABS'] += 1 }
        i2--;  
        for(let j = 0; j < 3; j++){
            
            if(tablero[i][j] == 'X'){ xPuntos['xDI'] += 1 }
            if(tablero[i][j] == 'O'){ oPuntos['oDI'] += 1 }

            if(tablero[j][i] == 'X'){ xPuntos['xAB'] += 1 }
            if(tablero[j][i] == 'O'){ oPuntos['oAB'] += 1 }         
        }
        //Se recorren lo objetos oPuntos y xPuntos que guardan las forma de ganar
        //para saber si una de las propiedades(llaves) tiene el valor de 3
        //Si se encuentran las 3X o 3O se retornara el ganador y finalizara la funcion
        for(let indiceO in oPuntos){
            if(oPuntos[indiceO] == 3){
                return 'O';
            }
            console.log(oPuntos,indiceO);
        }

        for(let indiceX in xPuntos){
            if(xPuntos[indiceX] == 3){
                return 'X';
            }
        }
        //Si no hay 3X o 3O se INICIALIZARAN LAS FORMA DE GANAR EN 0
        //esto es para que en las otra validaciones no se sumen los resultados anteriores
        xPuntos['xDI'] = 0;
        xPuntos['xAB'] = 0;
        oPuntos['oDI'] = 0;
        oPuntos['oAB'] = 0;
    }    
}


    