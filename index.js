let $tarjetasBocaArriba = document.getElementsByClassName("tarjeta-boca-arriba")
let $tarjetasBocaAbajo = document.getElementsByClassName("tarjeta-boca-abajo")
let contadorClics = 0
let eleccionTarjetas = []
let eleccionImagenes =[]
let turno = 0

popularTarjetas($tarjetasBocaArriba);

Array.from($tarjetasBocaAbajo).forEach(
    tarjeta => tarjeta.onclick = iniciarJuego
)

function popularTarjetas (tarjetas){

    let arrayAcumulador = []

    for (let i=0; i<tarjetas.length/2; i++){
        
        let numeroAleatorio1 = generaNumeroAleatorio(tarjetas.length,arrayAcumulador)
        arrayAcumulador.push(numeroAleatorio1)
        

        let numeroAleatorio2 = generaNumeroAleatorio(tarjetas.length,arrayAcumulador)
        arrayAcumulador.push(numeroAleatorio2)

        tarjetas[numeroAleatorio1].setAttribute("src",`media/img${i+1}.png`)
        tarjetas[numeroAleatorio1].nextElementSibling.id = `img${i+1}`

        tarjetas[numeroAleatorio2].setAttribute("src",`media/img${i+1}.png`)
        tarjetas[numeroAleatorio2].nextElementSibling.id = `img${i+1}`
    }
 
}


function generaNumeroAleatorio(max,arrayNumerosExcluidos){
    
    let numeroAleatorio = Math.floor(Math.random()*max)

    while (arrayNumerosExcluidos.includes(numeroAleatorio)){
        numeroAleatorio =  Math.floor(Math.random()*max)
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

    console.log(eleccionImagenes)
    
    if (contadorClics % 2 ===0){
        bloquearInputUsuario();
        turno++;
        
        if(evaluarEleccion(eleccionImagenes)){
            //animacionExito(eleccionTarjetas)
            console.log("ganaste")
            
        } else {
            //animacionPerder(eleccionTarjetas)
            console.log("perdiste")
            //ocultarTarjeta(eleccionTarjetas)
        }

    }

    //desbloquearInputUsuario()
}

//function reiniciarJuego()

function evaluarEleccion(arrayEleccion){
   return arrayEleccion[0] === arrayEleccion[1]
}

// function reiniciarTarjetaElegida(){

// }

function animacionExito (arrayElementos){

}

function animacionPerder(arrayElementos){


}


function bloquearInputUsuario(){
    Array.from($tarjetasBocaAbajo).forEach(
        tarjeta => tarjeta.onclick = ""
    )
}

function darVueltaTarjeta (tarjeta){
    tarjeta.previousElementSibling.classList.remove("d-none")
    tarjeta.classList.add("d-none")
}

function ocultarTarjeta (tarjeta){
    tarjeta.previousElementSibling.classList.add("d-none")
    tarjeta.classList.remove("d-none")
}



