document.getElementById("numreg").addEventListener("click", mostrarDatosAPI, true);
console.log(numreg);
document.getElementById("borrar").addEventListener("click", borrarDatosAPI, true);

let contenido = document.querySelector("#contenido")

function mostrarDatosAPI ()
{
      console.log("Ha pulsado Buscar medicamento"); 
        fetch('https://cima.aemps.es/cima/rest/medicamento?nregistro=51347')
        .then(res => res.json())
        .then(data => {
    console.log(data);
    let medicamento = data;
    console.log(medicamento);
    contenido.innerHTML = `${medicamento.nombre}`;
    contenido.innerHTML += `${medicamento.nregistro}`;
    contenido.innerHTML += `${medicamento.labtitular} <br>`
    
    let url_foto = data.fotos[0].url;
    console.log(url_foto);
    let imagen= `<img src= "${url_foto}" alt= "FOTO MEDICAMENTO">`;
    contenido.innerHTML += `${imagen}<br>`;
    
}
        )
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

function mostrarMensajeError() {
    document.getElementById('contenido').innerHTML = 'No se ha podido encontrar.';
}

function borrarDatosAPI() {
    console.log("Ha pulsado borrar usuario");
    Codigo.innerHTML = "";
}
