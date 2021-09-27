{//Dibujar en el canvas
// ctx.beginPath();                //Comenzar a dibujar
// ctx.fillStyle = "red";          //Color
// ctx.fillRect(0,0,100,100);      //Lo que se va a dibujar con sus propiedades
// ctx.stroke();                   //Realizar instrucciones

// ctx.beginPath();
// ctx.fillStyle = "purple";
// ctx.ellipse(300, 300, 50, 50, 0, 0, 2 * Math.PI); 
// //2 * Pi = Encontrar el radio del ciculo
// ctx.fill();                     //Llenar el circulo
// ctx.stroke();

// ctx.font = "40px Arial";
// ctx.fillStyle = "black";
// ctx.fillText("Vida cruel!", 200, 300);


// ctx.beginPath();
// ctx.fillStyle = "black";
// ctx.moveTo(20, 0);         //Las coordenadas desde donde comenzara la linea
// ctx.lineTo(20, 600)        //Las coordenadas hasta donde se dibujara la linea
// ctx.stroke();
}
//------------------------------------[ CONSTANTES ]-----------------------------------//

let DIRECCIONES = {
    ARRIBA: 1,
    ABAJO: 2,
    IZQUIERDA: 3,
    DERECHA: 4
};

const FPS = 1000 / 15;

let CANVAS = document.getElementById("juegoCanvas");
let CTX = CANVAS.getContext("2d");

let CONTENEDOR_NINTENDO = document.getElementById("contenedorNintendo");
let PUNTOS_TEXTO = document.getElementById("puntos");
let BANNER_ROTAR_TELEFONO = document.getElementById("bannerRotarTelefono");
let TITULO = document.getElementById("titulo");
let BOTON_CERRAR_BANNER = document.getElementById("botonCerrarBanner");

let SONIDO_COMIDA = new Audio("ganaste_un_punto.wav");

//--------------------------[ Estado del juego (direcciones) ]-------------------------//

let posicionCulebra;
let direccionActual;
let nuevaDireccion;
let comida;
let ciclo;
let puntos;

//------------------------------------[ Dibujar ]-------------------------------------//

// function dibujarCuadricula(context){
//     for(let x = 20; x < 600; x+= 20){
//         context.beginPath();
//         context.fillStyle = "black";
//         context.moveTo(x, 0);      
//         context.lineTo(x, 600)        
//         context.stroke();
//     }
//     for(let y = 20; y < 600; y+= 20){
//         context.beginPath();
//         context.fillStyle = "black";
//         context.moveTo(0, y);      
//         context.lineTo(600, y)        
//         context.stroke();
//     }
// }

function rellenarCuadrado(context, posX, posY, color = "black"){
    context.beginPath();  
    context.fillStyle = color;  
    context.fillRect(posX, posY,20,20); 
    context.stroke();
}

function dibujarCulebrita(context, culebra){
    for(let i in culebra){
        rellenarCuadrado(context, culebra[i].posX, culebra[i].posY, "yellow");
    }
}

function dibujarComida(context, comida){
    rellenarCuadrado(context, comida.posX, comida.posY);
}

function dibujarParedes(context){
    context.beginPath();
    context.lineWidth = "2"; //grosor de la linea 2px
    context.rect(20, 20, 560, 560); //rectangulo sin relleno (transparente)
    context.stroke();
}

function dibujarTexto(context, texto, x, y){
    context.font = "38px Cairo, sans-serif";
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText(texto, x, y);
}

//-------------------------------[ Culebrita (mover) ]---------------------------------//

function moverCulebrita(direccionCulebra, culebraCoordenada){
    let cabezaPosX = culebraCoordenada[0].posX;
    let cabezaPosY = culebraCoordenada[0].posY;

    if(direccionCulebra == DIRECCIONES.ARRIBA){
        cabezaPosY -= 20;
    }else if(direccionCulebra == DIRECCIONES.ABAJO){
        cabezaPosY += 20;
    }else if(direccionCulebra == DIRECCIONES.DERECHA){
        cabezaPosX += 20;
    }else if(direccionCulebra == DIRECCIONES.IZQUIERDA){
        cabezaPosX -= 20;
    }
    //Agregamos la nueva cabeza al principio de la lista
    culebraCoordenada.unshift({posX: cabezaPosX, posY: cabezaPosY});
    //Borramos la cola de la culebra    
    return culebraCoordenada.pop();
}

//------------------------------------[ Comida ]--------------------------------------//

function generarPosicionComida(culebra){
    while(true){

        //0 <= Math.random() < 1
        let columnaX = Math.max(Math.floor(Math.random() * 29), 1);
        let columnaY = Math.floor(Math.random() * 29);

        // if(columnaX == 0){
        //     columnaX = 1;
        // }
        if(columnaY == 0){
            columnaY = 1;
        }

        let posX = columnaX * 20;
        let posY = columnaY * 20;
        
        let comidaSobreCulebra = false;
        for(let key in culebra){
            if(culebra[key].posX == posX && culebra[key].posY == posY){
                comidaSobreCulebra = true;
                break;
            }
        }
        if(comidaSobreCulebra == true){
            continue;
        }
        return {posX: posX, posY: posY};
    }
}

function culebritaComioComida(culebra, comida){
    return culebra[0].posX == comida.posX && culebra[0].posY == comida.posY;
}

//----------------------------------[ Colisiones ]-----------------------------------//

function ocurrioColision(culebra){
    let cabeza = culebra[0];

    if(cabeza.posX < 20 || 
       cabeza.posY < 20 || 
       cabeza.posX >= 580 || 
       cabeza.posY >= 580)
    {
        return true;
    }

    if(culebra.length == 1){
        return false;
    }
    for(let i = 1; i < culebra.length; i++){
        if(cabeza.posX == culebra[i].posX && cabeza.posY == culebra[i].posY){
            return true;
        }
    }
    return false;
}

//-----------------------------------[ Puntaje ]-------------------------------------//

function mostrarPuntos(numPuntos){
    PUNTOS_TEXTO.innerText = "PUNTOS: " + numPuntos;
}

function incrementarPuntaje(){
    puntos++;
    mostrarPuntos(puntos);
    SONIDO_COMIDA.play();
}

//----------------------------------[ Responsive ]------------------------------------//

window.addEventListener("orientationchange", function(){
    TITULO.classList.add("esconder");
    BANNER_ROTAR_TELEFONO.classList.remove("esconder");
});

BOTON_CERRAR_BANNER.addEventListener("click", function(){
    TITULO.classList.remove("esconder");
    BANNER_ROTAR_TELEFONO.classList.add("esconder");
});

//-------------------------------[ Ciclo del juego ]---------------------------------//


document.addEventListener("keydown", function(event){
    if(event.code == 'ArrowUp' && direccionActual != DIRECCIONES.ABAJO){
        nuevaDireccion = DIRECCIONES.ARRIBA;
    }else if(event.code == 'ArrowDown' && direccionActual != DIRECCIONES.ARRIBA){
        nuevaDireccion = DIRECCIONES.ABAJO;
    }else if(event.code == 'ArrowRight' && direccionActual != DIRECCIONES.IZQUIERDA){
        nuevaDireccion = DIRECCIONES.DERECHA;
    }else if(event.code == 'ArrowLeft' && direccionActual != DIRECCIONES.DERECHA){
        nuevaDireccion = DIRECCIONES.IZQUIERDA;
    }
});

function cicloDeJuego(){
    let colaDescartada = moverCulebrita(nuevaDireccion, posicionCulebra);
    direccionActual = nuevaDireccion;

    if(culebritaComioComida(posicionCulebra, comida)){
        posicionCulebra.push(colaDescartada);
        comida = generarPosicionComida(posicionCulebra);
        incrementarPuntaje();
    }

    if(ocurrioColision(posicionCulebra)){
        gameOver();
        return;
    }

    CTX.clearRect(0,0,600,600); //Se borra el contenido del canvas
    dibujarCulebrita(CTX, posicionCulebra)
    dibujarComida(CTX, comida)
    dibujarParedes(CTX);
}

function gameOver(){
    clearInterval(ciclo);
    ciclo = undefined;
    dibujarTexto(CTX, "¡Fin del Juego!", 300, 260);
    dibujarTexto(CTX, "Click para volver a jugar", 300, 310);
    dibujarTexto(CTX, "Puntaje: " + puntos, 300, 360);
    CONTENEDOR_NINTENDO.classList.add("shake-horizontal");
}   

function empezarJuego(){
    posicionCulebra = [
        {posX: 200, posY: 200},  //Cabeza
        {posX: 180, posY: 200},
        {posX: 160, posY: 200},  //Cola
    ];
    
    direccionActual = DIRECCIONES.DERECHA;
    nuevaDireccion = DIRECCIONES.DERECHA;
    
    comida = generarPosicionComida(posicionCulebra);
    puntos = 0;

    mostrarPuntos(puntos)

    CONTENEDOR_NINTENDO.classList.remove("shake-horizontal");

    ciclo = setInterval(cicloDeJuego, FPS);
}



/*El método setInterval() llama a una función o evalúa una expresión a intervalos específicos (en milisegundos), en este caso ejecuta la funcion 15 veces cada segundo. 

Este continuará llamando a la función hasta que se llame a clearInterval() o se cierre la ventana*/

dibujarParedes(CTX);
dibujarTexto(CTX, "¡Click para empezar!", 300, 260);
dibujarTexto(CTX, "Desktop: Muévete con ↑ ↓ → ←", 300, 310);
dibujarTexto(CTX, "Móbil: Tap para girar la culebra", 300, 360);

CANVAS.addEventListener('click', function(){
    if(ciclo === undefined){
        empezarJuego();
        return;
    }

    if(direccionActual == DIRECCIONES.ABAJO){
        nuevaDireccion = DIRECCIONES.IZQUIERDA;
    }else if(direccionActual == DIRECCIONES.IZQUIERDA){
        nuevaDireccion = DIRECCIONES.ARRIBA;
    }else if(direccionActual == DIRECCIONES.ARRIBA){
        nuevaDireccion = DIRECCIONES.DERECHA;
    }else if(direccionActual == DIRECCIONES.DERECHA){
        nuevaDireccion = DIRECCIONES.ABAJO;
    }   
})