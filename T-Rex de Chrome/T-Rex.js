document.addEventListener('keyup', function(evento){
    if(evento.keyCode == 32) //keyCode 32 (telca espacio)
    console.log(evento.keyCode);
});


//-------------------------------------[ INICIALIZAR & BORRAR CANVAS ]--------------------------------------//

let canvas, ctx;
let iniciarCanvas = () => {
    canvas = document.getElementById('escenario');  //Elemento Canvas
    ctx = canvas.getContext('2d');                  //Como funciona la pantalla, en este caso sera 2d
}

//La manera mas sencilla de borrar el canvas es cambiarle la anchura y altura
let anchura = 700;
let altura = 300;
let borrarCanvas = () => {
    canvas.width = anchura;
    canvas.height = altura;
}


//------------------------------------------[ BUCLE PRINCIPAL ]--------------------------------------------//
/*
El método setInterval() llama a una función o evalúa una expresión a intervalos específicos (en milisegundos).
Este continuará llamando a la función hasta que se llame a clearInterval() o se cierre la ventana

Cada X milisegundos. Ejemplo => 1000 ms = 1 segundo.
INTERVALO: Porción de tiempo o de espacio cuya extensión se expresa y en la cual sucede o se da una cosa.
*/

//SINTAXIS
//setInterval(function, milliseconds, param1, param2, ...)
let FPS = setInterval(principal, 1000/10);  //Ej: llama a la función 10 veces cada segundo(1)

function principal(){
    borrarCanvas();
    
}

// clearInterval(FPS); => DETIENE el intervalo