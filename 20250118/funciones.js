document.getElementById("prueba").addEventListener("click", mostrarParrafo, true);
document.getElementById("mostrar").addEventListener("click", mostrarChicas, true);
document.getElementById("limpiar").addEventListener("click", limpiarDatosAPI, true);
let hueco = document.querySelector("#parrafo");
let contenido = document.querySelector("#contenido");

function mostrarParrafo()
{
    //hueco.innerHTML = 'Hola Mundo';
    //const url = "http://localhost:3000/operacion=4+5";
    const url = "http://localhost:3000/eco=Me gusta la pizza";

    fetch(url)
        .then(res => res.text())
        .then(data =>{
             console.log(data);
             hueco.innerHTML = data;
        })
}

function mostrarChicas()
{
    fetch("http://localhost:3000/belleza")
    .then(res => res.json())
    .then(data =>{
            console.log(data);
            n=data.length;
            contenido.innerHTML = '';
            for (let i=0; i<n; i++)
            {
                contenido.innerHTML += data[i].nombre + '<br>';
            }
        })
        
}

function limpiarDatosAPI()
{
    console.log('Ha pulsado borrar');
    hueco.innerHTML = '';
    contenido.innerHTML = '';
}