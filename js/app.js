const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();
  // validar
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    //mostrar error
    mostrarError("ambos campos son obligatorios");
    return;
  }
  // consultar a la api

  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector(".bg-red-100");

  if (!alerta) {
    const alerta = document.createElement("div");

    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );
    alerta.innerHTML = `<strong class="font-bold">Error !</strong>
        <span class="block">${mensaje}</span>
        `;
    container.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function consultarAPI(ciudad, pais) {
  const appId = "07f1fc7bdd3f9f119159db499b4f0e6e";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner() // muestra un Spinner de carga

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        limpiarHTML()
        console.log(datos);
    //   ; //limpiar el html previo

      if (datos.cod === "404") {
        mostrarError("ciudad no encontrada");
        return;
      }
      //imprime la respuesta en el HTML
      mostrarClima(datos);
      
    });
}

function mostrarClima(datos) {
  const { name, main: { temp, temp_max, temp_min }} = datos;

  const centrigados = kelvinCentrigados(temp)
  const max = kelvinCentrigados(temp_max)
  const min = kelvinCentrigados(temp_min)

  const actual = document.createElement("p");
  actual.innerHTML = `${centrigados} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement("p")
  tempMaxima.innerHTML = `Max: ${max} &#8451;`
  tempMaxima.classList.add("text-xl")

  const tempMinima = document.createElement("p")
  tempMinima.innerHTML = `Min: ${min} &#8451;`
  tempMinima.classList.add("text-xl")

  const nombreCiudad = document.createElement("p")
  nombreCiudad.textContent = `Clima en ${name}`
  nombreCiudad.classList.add("text-2xl")

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(nombreCiudad)
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima)
  resultadoDiv.appendChild(tempMinima)

  resultado.appendChild(resultadoDiv);
}

const kelvinCentrigados =grados=> parseInt(grados - 273.15)


function limpiarHTML() {
resultado.innerHTML = ''
  }

  function Spinner(){
    limpiarHTML()

    const divSpinner = document.createElement("div")
    divSpinner.classList.add("sk-fading-circle")

    divSpinner.innerHTML = `    
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `
    resultado.appendChild(divSpinner)
  }

