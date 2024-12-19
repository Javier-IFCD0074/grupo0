document.getElementById("btnBuscarMedicamento").addEventListener("click", buscarMedicamento, true);
document.getElementById("borrar").addEventListener("click", mostrarDatosAPI, true)

function buscarMedicamento() 
{
    const numeroRegistro = document.getElementById('txtNumeroRegistro').value;
    
    if (numeroRegistro === '51347') {
        cargarInformacionAspirina();
    } else {
        mostrarMensajeError();
    }
}

function cargarInformacionAspirina() {
    fetch(`https://cima.aemps.es/cima/rest/medicamento?nregistro=51347`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            mostrarDatosMedicamento(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            mostrarMensajeError();
        });
    }

    

function mostrarMensajeError() {
    document.getElementById('contenido').innerHTML = 'No se ha podido encontrar.';
}

function borrarcontenido() {
    console.log("Ha pulsado borrar usuario");
    contenido.innerHTML = "";
}
