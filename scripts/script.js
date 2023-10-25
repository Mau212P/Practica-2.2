// Variables definidas
const columnas = 4;
const filas = 4;
const totalBotones = columnas * filas;

let movimientos = 0;
let tiempoInicio;
let tiempoFin;
let timerInterval;

// Añade la matriz de respuesta
let matrizRespuesta = Array.from({length: totalBotones}, (_, i) => i + 1).join('');
matrizRespuesta = matrizRespuesta.substring(0, matrizRespuesta.length - 1) + '_';

// Variable para el botón vacío
let botonDestino;

// Función para iniciar el juego
function iniciarJuego() {
  movimientos = 0;
  tiempoInicio = new Date().getTime();
  // Inicia un intervalo de tiempo que se ejecuta cada segundo
  timerInterval = setInterval(actualizarContadores, 1000);
  mezclarBotones(); // Revuelve los botones al inicio del juego
  asignarEventos();
}

// Función para revolver los botones al inicio o cuando se presiona "Revolver"
function mezclarBotones() {
  const botones = document.querySelectorAll('.botoncito');
  const botonesArray = Array.from(botones);
  let numeros = Array.from({length: totalBotones - 1}, (_, i) => i + 1); // Genera un array con los números del 1 al 15

  numeros.sort(() => Math.random() - 0.5); // Revuelve los números
  numeros.push('_'); // Añade el espacio vacío al final

  botonesArray.forEach((boton, index) => {
    boton.textContent = numeros[index]; // Asigna un número revuelto a cada botón
    if (boton.textContent === '_') {
      botonDestino = boton; // Asigna el botón vacío a botonDestino
    }
  });

  actualizarContadores();
}

// Función para actualizar los contadores de movimientos y tiempo
function actualizarContadores() {
  document.getElementById('indicador1').textContent = `Movimientos: ${movimientos}`;
  if (tiempoInicio) {
    tiempoFin = new Date().getTime();
    const tiempoTranscurrido = Math.floor((tiempoFin - tiempoInicio) / 1000); // en segundos
    document.getElementById('indicador2').textContent = `Tiempo: ${tiempoTranscurrido} segundos`;
  }
}

// Función para asignar eventos de clic a los botones
function asignarEventos() {
  const contenedor = document.getElementById('rompecabezas');
  contenedor.addEventListener('click', (event) => {
    const boton = event.target;
    if (boton.classList.contains('botoncito') && boton.textContent !== '_') {
      moverBoton(boton);
    }
  });
}
// Función para mover un botón
function moverBoton(boton) {
  if (esMovimientoValido(boton)) {
    const textoBoton = boton.textContent;
    boton.textContent = '_';
    botonDestino.textContent = textoBoton;
    botonDestino = boton;
    movimientos++;
    actualizarContadores();
    if (esRompecabezasResuelto()) {
      // El rompecabezas se ha resuelto
      detenerTemporizador();
      alert('¡Has resuelto el rompecabezas!');
    }
  }
}

// Función para verificar si un movimiento es válido
// Función para verificar si un movimiento es válido
function esMovimientoValido(boton) {
  // Obtén la posición del botón y del espacio vacío
  const posicionBoton = obtenerPosicion(boton);
  const posicionVacio = obtenerPosicion(botonDestino); // Asume que 'botonDestino' es el espacio vacío

  // Comprueba si el botón está junto al espacio vacío
  const esAdyacente = (posicionBoton.fila === posicionVacio.fila && Math.abs(posicionBoton.columna - posicionVacio.columna) === 1) ||
                      (posicionBoton.columna === posicionVacio.columna && Math.abs(posicionBoton.fila - posicionVacio.fila) === 1);

  return esAdyacente;
}
