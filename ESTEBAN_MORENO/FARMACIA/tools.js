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
    .then(res => res.json())
    .then(data => { 
            console.log(data);
            let medicamento = data;
            console.log(medicamento);
            contenido.innerHTML = `${medicamento.nombre} `;
            contenido.innerHTML += ` ${medicamento.nregistro} `;
            contenido.innerHTML +=` ${medicamento.labtitular} <br>`;
                       
            let url_foto = data.fotos[0].url;
            console.log(url_foto);
            let imagen= `<img src="${url_foto}" alt="Mi ejemplo">`;          
            
}
    )
}
   
function LimpiarDatosForm()
{
    console.log('He pulsado el boton de limpiar datos del form');
    contenido.innerHTML = '';
}