//document.getElementById("mostrar").addEventListener("click", mostrarCosas, true);
document.getElementById("mostrar").addEventListener("click", mostrarDatosAPI, true);
document.getElementById("limpiar").addEventListener("click", limpiarDatosAPI, true);

let contenido = document.querySelector("#contenido");
    
function mostrarDatosAPI()
{
//contenido.innerHTML = 'Hola Mundo';
console.log('Ha pulsado medicamento');
fetch("https://cima.aemps.es/cima/rest/medicamento?nregistro= 74475")
    .then(res => res.json())
    .then(data => {
            console.log(data);
            let medicamento = data;
            console.log(data);
            contenido.innerHTML = `${medicamento.nombre} `;
            contenido.innerHTML += ` ${medicamento.nregistro} `;
            contenido.innerHTML += ` ${medicamento.labtitular} <br>`;
            
        let url_foto = data.fotos[0].url;
            console.log(url_foto);
            let imagen= `<img src="${url_foto}" alt="Mi ejemplo">`;
            contenido.innerHTML += `${imagen}<br>`;
})
    
}

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

function limpiarDatosAPI()
{
    console.log('Ha pulsado borrar usuario');
    contenido.innerHTML = '';
}