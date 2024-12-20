<<<<<<< HEAD
document.getElementById("numreg").addEventListener("click", MostrarDatosAPI, true);
console.log(numreg);
document.getElementById("limpiar").addEventListener("click", LimpiarDatosForm, true);
let contenido = document.querySelector("#contenido");

console.log(numreg);
contenido.innerHTML = `${numreg}`

function MostrarDatosAPI()
{
console.log('Ha pulsado medicamento. Vamos a buscarlo ...');

let URLfetchAPI = "https://cima.aemps.es/cima/rest/medicamento?nregistro=" & `$(numreg)`;
console.log(URLfetchAPI)
fetch(URLfetchAPI)
=======
//document.getElementById("mostrar").addEventListener("click", mostrarCosas, true);
document.getElementById("numreg").addEventListener("click", mostrarDatosAPI, true);
console.log(numreg);
document.getElementById("limpiar").addEventListener("click", LimpiarDatosForm, true);

let contenido = document.querySelector("#contenido");

function mostrarDatosAPI()
{
console.log('Ha pulsado medicamento. Vamos a buscarlo ...');
fetch("https://cima.aemps.es/cima/rest/medicamento?nregistro=51347")
>>>>>>> 04ad7c3f2a4e2ad43db48d8d08fc55a1adbe8a39
    .then(res => res.json())
    .then(data => { 
            console.log(data);
            let medicamento = data;
            console.log(medicamento);
            contenido.innerHTML = `${medicamento.nombre} `;
            contenido.innerHTML += ` ${medicamento.nregistro} `;
<<<<<<< HEAD
            contenido.innerHTML +=` ${medicamento.labtitular} <br>`;
                       
            let url_foto = data.fotos[0].url;
            console.log(url_foto);
            let imagen= `<img src="${url_foto}" alt="Mi ejemplo">`;          
            
=======
            contenido.innerHTML += ` ${medicamento.labtitular} <br>`;

            let url_foto = data.fotos[0].url;
            console.log(url_foto);
            let imagen= `<img src="${url_foto}" alt="Mi ejemplo">`;
            contenido.innerHTML += `${imagen}<br>`;
>>>>>>> 04ad7c3f2a4e2ad43db48d8d08fc55a1adbe8a39
}
    )
}
   
<<<<<<< HEAD
function LimpiarDatosForm()
{
    console.log('He pulsado el boton de limpiar datos del form');
    contenido.innerHTML = '';
}
=======
function mostrarCosas()
{
    contenido.innerHTML = 'Hola '
    for(i=0; i<7; i ++)
    {  
        if(i==2)
            contenido.innerHTML += ' Perros <br>';
        else
            contenido.innerHTML += ` Colegas ${i} <br>`;
    }
}

function LimpiarDatosForm()
{
    console.log('Ha pulsado el boton de limpiar datos del form');
    Codigo.innerHTML = '';
    
    //contenido.innerHTML = '';
}
>>>>>>> 04ad7c3f2a4e2ad43db48d8d08fc55a1adbe8a39
