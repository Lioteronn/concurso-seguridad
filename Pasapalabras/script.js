//total preguntas del juego
const TOTAL_PREGUNTAS = 10;
//tiempo del juego
const TIEMPO_DEL_JUEGO = 420;
//estructura para almacenar las preguntas
const bd_juego = [
  {
      id:'A',
      pregunta:"Proceso de verificar la identidad de un usuario para acceder a un sistema",
      respuesta:"autenticacion"
  },
  {
    id:'C',
    pregunta:"Proceso de codificacion y decodificacion de informacion para mantenerla segura",
    respuesta:"cifrado"
  },
  {
    id:'F',
    pregunta:"Dispositivo de seguridad que previene accesos no autorizados a una red de sistemas",
    respuesta:"firewall"
  },
  {
    id:'H',
    pregunta:"Proceso de transformar datos de un valor fijo de longitud mediante un algoritmo",
    respuesta:"hash"
  },
  {
    id:'M',
    pregunta:"Apodo comunmente como virus malicioso",
    respuesta:"malware"
  },
  {
    id:'P',
    pregunta:"Técnica de fraude en línea que utiliza engaños para obtener información confidencial",
    respuesta:"phishing"
  },
  {
    id:'S',
    pregunta:"Protocolo de seguridad utilizado para garantizar la comunicación segura en internet",
    respuesta:"ssl"
  },
  {
    id:'V',
    pregunta:"Red privada virtual que permite conexiones seguras através de internet",
    respuesta:"vpn"
  },
  {
    id:'W',
    pregunta:"Seguridad mejorada para redes wifi, reemplaza a WEP",
    respuesta:"wpa"
  },
  {
    id:'Z',
    pregunta:"Vulnerabilidad de software desconocida y sin un parche de seguridad disponible",
    respuesta:"zero day"
  },
]
var estadoPreguntas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cantidadAcertadas = 0;
var numPreguntaActual = -1;
var preguntasIncorrectas = [];

const timer = document.getElementById("tiempo");
let timeLeft = TIEMPO_DEL_JUEGO;
var countdown;

var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function (event) {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});

const container = document.querySelector(".container");
for (let i = 0; i < TOTAL_PREGUNTAS; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  const letra = bd_juego[i].id;
  circle.textContent = letra;
  circle.id = letra.toUpperCase();
  container.appendChild(circle);

  const angle = (i / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
  const x = Math.round(95 + 120 * Math.cos(angle));
  const y = Math.round(95 + 120 * Math.sin(angle));
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}

function cargarPregunta() {
  numPreguntaActual++;

  // Verificar si quedan preguntas no contestadas
  if (estadoPreguntas.indexOf(0) >= 0) {
    // Buscar la próxima pregunta no contestada
    while (estadoPreguntas[numPreguntaActual % TOTAL_PREGUNTAS] === 1) {
      numPreguntaActual++;
    }
  } else {
    // Si no hay más preguntas no contestadas, verificar las incorrectas
    if (preguntasIncorrectas.length > 0) {
      numPreguntaActual = preguntasIncorrectas.shift();
    } else {
      // Si no quedan preguntas, detener el juego
      clearInterval(countdown);
      mostrarPantallaFinal();
      return;
    }
  }

  document.getElementById("letra-pregunta").textContent =
    bd_juego[numPreguntaActual % TOTAL_PREGUNTAS].id;
  document.getElementById("pregunta").textContent =
    bd_juego[numPreguntaActual % TOTAL_PREGUNTAS].pregunta;
  var letra = bd_juego[numPreguntaActual % TOTAL_PREGUNTAS].id;

  document.getElementById(letra).classList.remove("pregunta-actual");
  document.getElementById(letra).classList.remove("bien-respondida");
  document.getElementById(letra).classList.remove("mal-respondida");

  document.getElementById(letra).classList.add("pregunta-actual");
}




var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    if (respuesta.value === "") {
      alert("Debe ingresar un valor!!");
      return;
    }
    var txtRespuesta = respuesta.value;
    controlarRespuesta(txtRespuesta.toLowerCase());
  }
});

function controlarRespuesta(txtRespuesta) {
  txtRespuesta = txtRespuesta.toLowerCase();

  if (txtRespuesta === bd_juego[numPreguntaActual].respuesta) {
    cantidadAcertadas++;
    estadoPreguntas[numPreguntaActual] = 1;
    var letra = bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("bien-respondida");
  } else {
    estadoPreguntas[numPreguntaActual] = 1;
    preguntasIncorrectas.push(numPreguntaActual);
    var letra = bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("mal-respondida");
  }

  respuesta.value = "";
  cargarPregunta();
}

var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function (event) {
  var letra = bd_juego[numPreguntaActual].id;
  document.getElementById(letra).classList.remove("pregunta-actual");
  preguntasIncorrectas.push(numPreguntaActual);
  cargarPregunta();
});

function largarTiempo() {
  countdown = setInterval(() => {
    timeLeft--;

    timer.innerText = timeLeft;

    if (timeLeft < 0) {
      clearInterval(countdown);
      mostrarPantallaFinal();
    }
  }, 1000);
}

function mostrarPantallaFinal() {
  document.getElementById("acertadas").textContent = cantidadAcertadas;
  document.getElementById("score").textContent =
    (cantidadAcertadas * 100) / TOTAL_PREGUNTAS + "% de acierto";
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "block";
  if (cantidadAcertadas === TOTAL_PREGUNTAS) {
    alert(
      "¡Felicidades! Has acertado todas las preguntas. Pista IP: 192.168.1.80"
    );
  }
}

var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function (event) {
  numPreguntaActual = -1;
  timeLeft = TIEMPO_DEL_JUEGO;
  timer.innerText = timeLeft;
  cantidadAcertadas = 0;
  estadoPreguntas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  preguntasIncorrectas = [];

  var circulos = document.getElementsByClassName("circle");
  for (i = 0; i < circulos.length; i++) {
    circulos[i].classList.remove("bien-respondida");
    circulos[i].classList.remove("mal-respondida");
  }

  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});