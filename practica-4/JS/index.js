
// variables
const inputCedula = document.querySelector("#cedula")
const span = document.getElementById("check") // mensaje para ver como vamos
const pverificador = document.getElementById("verificador")
const pSuma = document.getElementById("result")
const pEstado = document.getElementById("final")
const glass = document.getElementById("glass")

let buenaEntrada = false // cuando tengamos los digitos de la cedula llenaremos lo demas

inputCedula.addEventListener("keyup",cedulaEntrada) // Detectamos cambios en el campo cedula

function cedulaEntrada() {
    let valor = inputCedula.value
    let primeraCondicion = !isNaN(valor) && (valor != "") // Verificar si el valor es un numero y no esta vacio

    if (!primeraCondicion) {
        span.innerText = " Solo se aceptan numeros."
        return
    }
    if (valor.includes(" ")) {
        span.innerText = " No espacios en blanco."
        return
    }

    if (valor.length === 11 ) { // Numero mayor igual a 10
        span.innerText = " 11/11"
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
    let total = 0
    for (let i = 0; i < cedula.length; i++) {
        let temp = i%2 == 0 ? parseInt(cedula[i]) : parseInt(cedula[i]) * 2 //si es impar multiplicamos
        total += temp > 9 ?  (temp-9) : temp
    }
    return total%10 === 0 ? true : false
}

const cedula0 = (valores) => valores.slice(0,3) === "000" // Si los 3 primeros digitos son 0 retorna verdadero
const changeColor = (color) => glass.style.background = (color == "green") ? "rgba(38,255,1,0.59)" : "rgba(255,25,88,0.59)"
