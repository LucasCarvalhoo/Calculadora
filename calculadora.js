const display = document.getElementById('display')
const numeros = document.querySelectorAll('[id*=tecla]')
const operadores = document.querySelectorAll('[id*=operador]')
const igual = document.getElementById('igual')

let novoNumero = true
let operador
let guardarNumero


const operacaoPendente = () => operador != undefined

const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'))
        novoNumero = true
        const resultado = eval (`${guardarNumero}${operador}${numeroAtual}`)
        atualizarDisplay(resultado)
    }
}


const atualizarDisplay = (texto) => {
    if(novoNumero) {
        display.textContent = texto
        novoNumero = false
    }else {
        display.textContent += texto
    }
}

const selecionarOperador = (evento) => {
    if(!novoNumero){
        calcular()
        novoNumero = true
        operador = evento.target.textContent
        guardarNumero = parseFloat(display.textContent)
    }
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent)
numeros.forEach (numero => numero.addEventListener('click', inserirNumero)) 

operadores.forEach (operador => operador.addEventListener('click', selecionarOperador))

const ativarIgual = () => {
    calcular()
    operador = undefined
}
document.getElementById('igual').addEventListener('click', ativarIgual)

const limparDisplay = () => display.textContent = ''
document.getElementById('limparDisplay').addEventListener('click', limparDisplay)

const limparCalculo = () => {
    limparDisplay() 
    operador = undefined
    novoNumero = true
    guardarNumero = undefined
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo)

const removeUltimoCaractere = () =>  display.textContent = display.textContent.slice(0, -1)
document.getElementById('backSpace').addEventListener('click', removeUltimoCaractere)

const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay (display.textContent * -1)
}
document.getElementById('inverter').addEventListener('click', inverterSinal)

const existeDecimal = () => display.textContent.indexOf(',') != 1

const existeValor = () => display.textContent.length > 0
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if(existeValor()) {
            atualizarDisplay(',')
        }else {
            atualizarDisplay('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal)
