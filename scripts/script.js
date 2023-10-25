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
