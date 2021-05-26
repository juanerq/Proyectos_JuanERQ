//Hacer un programa que indique el numero mayor y menor de entre los numeros que el usuaria escocoja 

//1. pedir al usuario cuantos numeros desea comparar
//2. pedir al usuario la x cantidad de numeros y guardarlos en un array (.push)
//3. comparar X y Y e ir rotando el numero mayor a X y el numero menor a Y
//4. imprimir el numero menor y mayor guiandonos de el orden que hicimos
//5. primero posicion (0) = numero menor - ultima posicion (.length -1) = numero mayor  


const numeros = [];
let x = 0;
let y = 1;

let xNumeros = parseInt(prompt("¿Cuantos numeros desea comparar?"));
let numMayor;
let numMenor;

for(let i = 1; i <= xNumeros; i++){
    numeros.push(parseInt(prompt("Numero " + i + " de " + xNumeros)));
}

numeroMayor();
numeroMenor();
alert("El numero mayor es: " + numMayor + "\n El numero menor es: " + numMenor);

function numeroMenor(){
    y = 0;
    x = 1;
    for(let c = 1; c < xNumeros; c++){
        if(numeros[y] <= numeros[x]){
            x++;
        }else{
            y = x;
            x++;
        }
    }
    return numMenor = numeros[y];
}

function numeroMayor(){
    x = 0;
    y = 1;
    for(let c = 1; c < xNumeros; c++){
        if(numeros[x] >= numeros[y]){
            y++;
        }else{
            x = y;
            y++;
        }
    }
    return numMayor = numeros[x];
}
