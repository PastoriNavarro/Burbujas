"use strict";

/*
    FUNCION PARA EVENTOS COMPATIBLE CON OTROS NAVEGADORES
*/
function agregarEvento(elemento, evento, funcion) {
if (elemento.addEventListener) {
    elemento.addEventListener(evento, funcion);
} else {
    elemento.attachEvent("on" + evento, funcion);
}
}

/*
    CONTENEDOR PRINCIPAL
*/
let contenedorPrincipal = document.createElement("div");

document.body.append(contenedorPrincipal);

contenedorPrincipal.classList.add("contenedorPrincipal");

/*
    PANEL IZQUIERDO
*/
let panelIzdo = document.createElement("div");

contenedorPrincipal.append(panelIzdo);

panelIzdo.classList.add("panelIzdo");

/*
    TITULO MENU
*/
let tituloMenu = document.createElement("h1");

panelIzdo.append(tituloMenu);

tituloMenu.textContent = "Menú";

/*
    PANEL DERECHO
*/
let panelDcho = document.createElement("div");

contenedorPrincipal.append(panelDcho);

panelDcho.classList.add("panelDcho");

/*
    TITULO JUEGO
*/
let tituloJuego = document.createElement("h1");

panelDcho.append(tituloJuego);

tituloJuego.textContent = "Juego";

/*
    BOTON INICIAR
*/
let botonIniciar = document.createElement("button");

panelIzdo.append(botonIniciar);

botonIniciar.classList.add("iniciar");

botonIniciar.textContent = "Iniciar Juego";

botonIniciar.id = "btnInicio";

/*
    PARRAFO PUNTUACION
*/
let puntuacion = document.createElement("p");

panelIzdo.append(puntuacion);

puntuacion.classList.add("puntuacion");

puntuacion.textContent = "Puntuación actual: 0";

/*
    VARIABLES DEL JUEGO
*/
let puntos = 0;

let record = 0;

/*
    PARRAFO RECORD MAXIMO
*/
let recordMax = document.createElement("p");

panelIzdo.append(recordMax);

recordMax.classList.add("record");

/*
    RECUPERAR RECORD DEL LOCALSTORAGE
*/
if (localStorage.getItem("record") !== null) {
record = Number(localStorage.getItem("record"));
}

/*
    MOSTRAR RECORD
*/
recordMax.textContent = "Record Máximo: " + record;

/*
    EVENTO DEL BOTON INICIAR
*/
agregarEvento(botonIniciar, "click", function () {
puntos = 0;

botonIniciar.disabled = true;

puntuacion.textContent = "Puntuación actual: 0";

/*
        INTERVALO PARA CREAR BURBUJAS
    */
let intervalo = setInterval(function () {
    /*
            CREAR BURBUJA
        */
    let burbuja = document.createElement("div");

    burbuja.classList.add("burbuja");

    /*
            ARRAY DE COLORES
        */
    let colores = ["roja", "azul", "verde"];

    /*
            COLOR ALEATORIO
        */
    let colorAleatorio = Math.floor(Math.random() * colores.length);

    burbuja.classList.add(colores[colorAleatorio]);

    panelDcho.append(burbuja);

    /*
            POSICIONES ALEATORIAS
        */
    let posicionX = Math.floor(Math.random() *(panelDcho.clientWidth - 70));
    let posicionY = Math.floor(Math.random() *(panelDcho.clientHeight - 70));

    burbuja.style.left = posicionX + "px";

    burbuja.style.top = posicionY + "px";

    /*
            EVENTO CLICK BURBUJA
        */
    agregarEvento(burbuja, "click", function () {
    burbuja.remove();

    puntos++;

    puntuacion.textContent = "Puntuación actual: " + puntos;
    });

    /*
            DESAPARECER BURBUJA
        */
    setTimeout(function () {
    burbuja.remove();
    }, 2000);
}, 1000);

/*
        FINAL DEL JUEGO
    */
setTimeout(function () {
    clearInterval(intervalo);

    botonIniciar.disabled = false;

    /*
            COMPROBAR RECORD
        */
    if (puntos > record) {
record = puntos;

localStorage.setItem("record", record);

recordMax.textContent = "Record Máximo: " + record;
    }
}, 30000);
});
