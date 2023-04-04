let $tarjetasBocaArriba = document.getElementsByClassName(
  "tarjeta-boca-arriba"
);
let $tarjetasBocaAbajo = document.getElementsByClassName("tarjeta-boca-abajo");
let $estado = document.getElementById("estado");

let contadorClics = 0;
let eleccionTarjetas = [];
let eleccionImagenes = [];
let turno = 0;

function configurarJuego(){
  popularTarjetas($tarjetasBocaArriba);
  desbloquearInputUsuario();
}

function popularTarjetas(tarjetas) {
  let arrayAcumulador = [];

  for (let i = 0; i < tarjetas.length / 2; i++) {
    let numeroAleatorio1 = generaNumeroAleatorio(
      tarjetas.length,
      arrayAcumulador
    );
    arrayAcumulador.push(numeroAleatorio1);

    let numeroAleatorio2 = generaNumeroAleatorio(
      tarjetas.length,
      arrayAcumulador
    );
    arrayAcumulador.push(numeroAleatorio2);

    tarjetas[numeroAleatorio1].setAttribute("src", `media/img${i + 1}.png`);
    tarjetas[numeroAleatorio1].nextElementSibling.id = `img${i + 1}`;

    tarjetas[numeroAleatorio2].setAttribute("src", `media/img${i + 1}.png`);
    tarjetas[numeroAleatorio2].nextElementSibling.id = `img${i + 1}`;
  }
}

function generaNumeroAleatorio(max, arrayNumerosExcluidos) {
  let numeroAleatorio = Math.floor(Math.random() * max);

  while (arrayNumerosExcluidos.includes(numeroAleatorio)) {
    numeroAleatorio = Math.floor(Math.random() * max);
  }

  return numeroAleatorio;
}

function iniciarJuego(clic) {
  let tarjetaElegida = clic.target;
  darVueltaTarjeta(tarjetaElegida);
  eleccionTarjetas.push(tarjetaElegida);
  eleccionImagenes.push(tarjetaElegida.id);

  contadorClics++;
  //mostrarBotonReiniciar;

  if (evaluarGanarJuego($tarjetasBocaArriba)) {
    $estado.classList.remove("alert-light", "alert-danger", "alert-success");
    $estado.classList.add("alert-primary");
    $estado.textContent = `Ganaste en ${turno} turnos`;
    return;
  }

  if (contadorClics % 2 === 0) {
    bloquearInputUsuario();
    turno++;

    if (evaluarEleccion(eleccionImagenes)) {
      $estado.textContent = "Correcto!";
      $estado.classList.remove("alert-light", "alert-danger");
      $estado.classList.add("alert-success");
      eleccionTarjetas = [];
      eleccionImagenes = [];
      setTimeout(function () {
        $estado.textContent = "Seguí jugando";
        $estado.classList.remove("alert-success", "alert-danger");
        $estado.classList.add("alert-light");
      }, 1100);

      setTimeout(desbloquearInputUsuario, 450);
    } else {
      bloquearInputUsuario();
      setTimeout(perder, 400);
      setTimeout(desbloquearInputUsuario, 450);

      setTimeout(function () {
        $estado.textContent = "Seguí jugando";
        $estado.classList.remove("alert-success", "alert-danger");
        $estado.classList.add("alert-light");
      }, 1100);
    }
  }
}

function limpiarElecciones(elecciones) {
  elecciones = [];
}

function perder() {
  $estado.textContent = "Incorrecto";
  $estado.classList.remove("alert-light");
  $estado.classList.add("alert-danger");

  eleccionTarjetas.forEach((tarjeta) => ocultarTarjeta(tarjeta));
  eleccionTarjetas = [];
  eleccionImagenes = [];
}
//function reiniciarJuego() - feature a agregar

function evaluarEleccion(arrayEleccion) {
  return arrayEleccion[0] === arrayEleccion[1];
}

function evaluarGanarJuego(array) {
  //devuelve true si se ganó (todas las tarjetas están boca arriba)
  let acumulador = [];
  let aux = Array.from(array);

  for (i = 0; i < array.length; i++) {
    acumulador.push(!aux[i].classList.contains("d-none"));
  }

  return acumulador.every((element) => element === true);
}

function desbloquearInputUsuario() {
  Array.from($tarjetasBocaAbajo).forEach(
    (tarjeta) => (tarjeta.onclick = iniciarJuego)
  );
}

function bloquearInputUsuario() {
  Array.from($tarjetasBocaAbajo).forEach((tarjeta) => (tarjeta.onclick = ""));
}

function darVueltaTarjeta(tarjeta) {
  tarjeta.previousElementSibling.classList.remove("d-none");
  tarjeta.classList.add("d-none");
}

function ocultarTarjeta(tarjeta) {
  tarjeta.previousElementSibling.classList.add("d-none");
  tarjeta.classList.remove("d-none");
}

configurarJuego();
