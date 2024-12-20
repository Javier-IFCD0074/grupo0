document.getElementById("btnBuscarMedicamento").addEventListener("click", mostrarDatosAPI, true);
document.getElementById("borrar").addEventListener("click", borrarDatosAPI, true)

console.log("Ha pulsado mostrar usuario"); {
fetch('https://cima.aemps.es/cima/rest/medicamento?nregistro=51347')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    buscarMedicamento(data);
  })
  .catch(error => console.error('Error fetching data:', error));

}
  function mostrarDatosAPI(medicamento) {
    const contenido = document.getElementById('contenido');
    
    contenido.innerHTML = `
        <h2>${medicamento.nombre}</h2>
        <p>Registro: ${medicamento.nregistro}</p>
        
        ${medicamento.principiosActivos 
            ? `<h3>Principales componentes:</h3>
               <ul>
                   ${medicamento.principiosActivos.map(p => `<li>${p.nombre} (${p.cantidad} ${p.unidad})</li>`).join('')}
               </ul>`
            : '<p>No se han encontrado principios activos.</p>'
        }
        
        <h3>Formulación:</h3>
        <p>${medicamento.formaFarmaceuticaSimplificada?.nombre}</p>
        
        <h3>Dosis recomendada:</h3>
        <p>${medicamento.dosis}</p>
    `;
}
  
 

    

function mostrarMensajeError() {
    document.getElementById('contenido').innerHTML = 'No se ha podido encontrar.';
}

function borrarDatosAPI() {
    console.log("Ha pulsado borrar usuario");
    contenido.innerHTML = "";
}
