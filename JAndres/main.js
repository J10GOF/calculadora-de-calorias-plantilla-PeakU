const formularioCalculadora = document.getElementById('formulario-calculadora')
const resultado = document.getElementById('resultado')

formularioCalculadora.addEventListener('submit', (evento) => {
    evento.preventDefault();
    calcularCalorias();
})




function calcularCalorias() {
    aparecerResultado();

    const nombre = document.querySelector('#nombre').value;
    const identificacion = document.querySelector('#identificacion').value;
    const ndocumento = document.querySelector('#ndoc').value;
    const edad = parseInt(document.querySelector('#edad').value);
    const peso = parseFloat(document.querySelector('#peso').value);
    const altura = parseFloat(document.querySelector('#altura').value);
    const actividad = parseFloat(document.querySelector('#actividad').value);
    const genero = document.querySelector('input[name="genero"]:checked');

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    };

    if (!(nombre && identificacion && edad && peso && altura)) {
        mostrarMensajeDeError('Asegurese de llenar todos los campos faltantes');
        return;
    }

    let calculoCalorias;

    if (genero.id === "masculino") {
        calculoCalorias = actividad * ((multiplicadorTMB.peso * peso) + (multiplicadorTMB.altura * altura) + (multiplicadorTMB.edad * edad) + 5);
    } else {
        calculoCalorias = actividad * ((multiplicadorTMB.peso * peso) + (multiplicadorTMB.altura * altura) + (multiplicadorTMB.edad * edad) - 161);
    }

    let grupoPoblacional;

    if (edad >= 15 && edad <= 29) {
        grupoPoblacional = "Joven";
    } else if (edad >= 30 && edad <= 59) {
        grupoPoblacional = "Adulto";
    } else {
        grupoPoblacional = "Adulto Mayor";
    }

    resultado.innerHTML = `
    <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
        <h5 class="card-title h2">Calorias requeridas:</h5>
        <p class="card-text">El paciente ${nombre} identificado con ${identificacion} NO. ${ndocumento}, requiere un total de ${Math.floor(calculoCalorias)} kcal para el sostenimiento de su TBM.</p>
        <p class="card-text">Grupo poblacional:  ${grupoPoblacional}</p>
    </div>        
`;
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
    }, 10)
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
    }, 10)
}