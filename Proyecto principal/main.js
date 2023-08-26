const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (evento) => {
    evento.preventDefault();
    calcularCalorias();
});

const multiplicadorTMB = {
    peso: 10,
    altura: 6.25,
    edad: 5
};

function calcularCalorias() {
    aparecerResultado();

    const nombre = getValue('#nombre');
    const identificacion = getValue('#identificacion');
    const ndocumento = getValue('#ndoc');
    const edad = parseInt(getValue('#edad'));
    const peso = parseFloat(getValue('#peso'));
    const altura = parseFloat(getValue('#altura'));
    const actividad = parseFloat(getValue('#actividad'));
    const generoFactor = (document.querySelector('input[name="genero"]:checked').id === 'masculino') ? 5 : -161;

    if (!(nombre && identificacion && edad && peso && altura)) {
        mostrarMensajeDeError('Asegúrese de llenar todos los campos faltantes');
        return;
    }

    const tmbCalculo = (multiplicadorTMB.peso * peso) + (multiplicadorTMB.altura * altura) + (multiplicadorTMB.edad * edad);
    const calculoCalorias = actividad * (tmbCalculo + generoFactor);

    const grupoPoblacional = (edad >= 15 && edad <= 29) ? "Joven" : (edad >= 30 && edad <= 59) ? "Adulto" : "Adulto Mayor";

    resultado.innerHTML = `
    <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
        <h5 class="card-title h2">Calorías requeridas:</h5>
        <p class="card-text">El paciente ${nombre} identificado con ${identificacion} NO. ${ndocumento}, requiere un total de ${Math.floor(calculoCalorias)} kcal para el sostenimiento de su TBM.</p>
        <p class="card-text">Grupo poblacional: ${grupoPoblacional}</p>
    </div>`;
}

function getValue(selector) {
    return document.querySelector(selector).value;
}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}

// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10);
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10);
}
