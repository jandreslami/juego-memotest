let $tarjetasBocaArriba = document.getElementsByClassName("tarjeta-boca-arriba")
let $tarjetasBocaAbajo = document.getElementsByClassName("tarjeta-boca-abajo")


function popularTarjetas (tarjetas){

    let arrayAcumulador = []

    for (let i=0; i<tarjetas.length/2; i++){
        
        let numeroAleatorio1 = generaNumeroAleatorio(tarjetas.length,arrayAcumulador)
        arrayAcumulador.push(numeroAleatorio1)
        

        let numeroAleatorio2 = generaNumeroAleatorio(tarjetas.length,arrayAcumulador)
        arrayAcumulador.push(numeroAleatorio2)

        tarjetas[numeroAleatorio1].setAttribute("src",`media/img${i+1}.png`)
        tarjetas[numeroAleatorio2].setAttribute("src",`media/img${i+1}.png`)
    }
 
}



function generaNumeroAleatorio(max,arrayNumerosExcluidos){
    
    let numeroAleatorio = Math.floor(Math.random()*max)

    while (arrayNumerosExcluidos.includes(numeroAleatorio)){
        numeroAleatorio =  Math.floor(Math.random()*max)
    }

    return numeroAleatorio
}


function darVueltaTarjeta (posicion){
    $tarjetasBocaArriba[posicion].classList.remove("d-none")
    $tarjetasBocaAbajo[posicion].classList.add("d-none")
}



popularTarjetas($tarjetasBocaArriba);

