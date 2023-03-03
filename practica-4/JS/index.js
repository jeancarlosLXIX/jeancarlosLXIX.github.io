
// variables
const inputCedula = document.querySelector("#cedula")
const span = document.getElementById("check") // mensaje para ver como vamos
const pverificador = document.getElementById("verificador")
const pSuma = document.getElementById("result")
const pEstado = document.getElementById("final")
const glass = document.getElementById("glass")

let buenaEntrada = false // cuando tengamos los digitos de la cedula llenaremos lo demas

// Detectamos cambios en el campo cedula
inputCedula.addEventListener("keyup",cedulaEntrada)

function cedulaEntrada() {
    let valor = inputCedula.value
    // Verificar si el valor es un numero y no esta vacio
    let primeraCondicion = !isNaN(valor) && (valor != "")

    if (!primeraCondicion) {
        span.innerText = " Solo se aceptan numeros."
        return
    }
    if (valor.includes(" ")) {
        span.innerText = " No espacios en blanco."
        return
    }

    if (valor.length === 11 ) { // Numero mayor igual a 10
        span.innerText = "✅ 11/11"
        if (cedula0(valor)){
          span.innerText = " Cedula invalida."
          inputCedula.value = ""
          pEstado.innerText = " Cedula no existe."
          return
        }
        
        buenaEntrada = true
        
    } else {
        span.innerText = `${valor.length}/11`
        changeColor(" ")
        buenaEntrada = false
    }

    if (buenaEntrada) {
        if (verificadorLuhn(valor)) {
            pEstado.innerText = " Correcta"
            changeColor("green")
        } else{
            pEstado.innerText = " Incorrecta"
        }
        cedula0(valor)
    } else{
        pEstado.innerText = ""
    }
}

function verificadorLuhn(cedula) { 

    let revertido = cedula.split('').reverse().join('')
    /**
     * Split lo divide en un arreglo
     * reverse lo invierte 
     * join es para unirlos en un string
     */
    let sumarImpar = 0
    for (let i = 0; i < revertido.length; i+=2) { // aumentamos de 2 en 2 para que sea impar
      let x = parseInt(revertido[i])
      sumarImpar += x
    }
    let sumarPar = 0
    for (let i = 1; i < revertido.length; i+=2) {
      let x = parseInt(revertido[i])
      x = x * 2
      if (x > 9) { // Mayor a 9 le restamos 9
        x -= 9
      }
      sumarPar += x
    }
    let total = sumarImpar + sumarPar  
    if (total % 10 === 0) {
      return true
    } else {
      return false
    }
}

const cedula0 = (valores) => valores.slice(0,3) === "000" // Si los 3 primeros digitos son 0 retorna verdadero

function changeColor(color) {
  let bg = (color == "green") ? "rgba(38,255,1,0.59)" : "rgba(255,25,88,0.59)"

  glass.style.background = bg
}