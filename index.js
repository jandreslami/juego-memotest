let $tarjetasBocaArriba = document.getElementsByClassName("tarjeta-boca-arriba")
let $tarjetasBocaAbajo = document.getElementsByClassName("tarjeta-boca-abajo")
let $estado = document.getElementById("estado")

let contadorClics = 0
let eleccionTarjetas = []
let eleccionImagenes = []
let turno = 0

popularTarjetas($tarjetasBocaArriba);
desbloquearInputUsuario();

function popularTarjetas(tarjetas) {

    let arrayAcumulador = []

    for (let i = 0; i < tarjetas.length / 2; i++) {

        let numeroAleatorio1 = generaNumeroAleatorio(tarjetas.length, arrayAcumulador)
        arrayAcumulador.push(numeroAleatorio1)


        let numeroAleatorio2 = generaNumeroAleatorio(tarjetas.length, arrayAcumulador)
        arrayAcumulador.push(numeroAleatorio2)

        tarjetas[numeroAleatorio1].setAttribute("src", `media/img${i + 1}.png`)
        tarjetas[numeroAleatorio1].nextElementSibling.id = `img${i + 1}`

        tarjetas[numeroAleatorio2].setAttribute("src", `media/img${i + 1}.png`)
        tarjetas[numeroAleatorio2].nextElementSibling.id = `img${i + 1}`
    }

}

function generaNumeroAleatorio(max, arrayNumerosExcluidos) {

    let numeroAleatorio = Math.floor(Math.random() * max)

    while (arrayNumerosExcluidos.includes(numeroAleatorio)) {
        numeroAleatorio = Math.floor(Math.random() * max)
    }

    return numeroAleatorio
}

function iniciarJuego(clic) {

    let tarjetaElegida = clic.target
    darVueltaTarjeta(tarjetaElegida);
    eleccionTarjetas.push(tarjetaElegida)
    eleccionImagenes.push(tarjetaElegida.id)

    contadorClics++;
    //mostrarBotonReiniciar;

    if (contadorClics % 2 === 0) {
        bloquearInputUsuario();
        turno++;


        if (evaluarEleccion(eleccionImagenes)) {
            $estado.textContent = "Correcto!"
            $estado.classList.remove("alert-light", "alert-danger")
            $estado.classList.add("alert-success")
            eleccionTarjetas = []
            eleccionImagenes = []
            setTimeout(function () {
                $estado.textContent = "Ahora seguí jugando"
                $estado.classList.remove("alert-success", "alert-danger")
                $estado.classList.add("alert-light")

            },
                1200)

                setTimeout(desbloquearInputUsuario, 1200)

        } else {
            bloquearInputUsuario();
            setTimeout(perder, 500)
            setTimeout(desbloquearInputUsuario, 1500)

            setTimeout(function () {
                $estado.textContent = "Ahora seguí jugando"
                $estado.classList.remove("alert-success", "alert-danger")
                $estado.classList.add("alert-light")
            },
                1200)
        }


    }



}

function limpiarElecciones(elecciones) {
    elecciones = []
}

function perder() {
    $estado.textContent = "Incorrecto"
    $estado.classList.remove("alert-light")
    $estado.classList.add("alert-danger")
    console.log(eleccionTarjetas)
    console.log(eleccionImagenes)
    eleccionTarjetas.forEach(tarjeta => ocultarTarjeta(tarjeta))
    eleccionTarjetas = []
    eleccionImagenes = []

}
//function reiniciarJuego()

function evaluarEleccion(arrayEleccion) {
    return arrayEleccion[0] === arrayEleccion[1]
}


function desbloquearInputUsuario() {
    Array.from($tarjetasBocaAbajo).forEach(
        tarjeta => tarjeta.onclick = iniciarJuego
    )
}

function bloquearInputUsuario() {
    Array.from($tarjetasBocaAbajo).forEach(
        tarjeta => tarjeta.onclick = ""
    )
}

function darVueltaTarjeta(tarjeta) {
    tarjeta.previousElementSibling.classList.remove("d-none")
    tarjeta.classList.add("d-none")
}

function ocultarTarjeta(tarjeta) {
    tarjeta.previousElementSibling.classList.add("d-none")
    tarjeta.classList.remove("d-none")
}



