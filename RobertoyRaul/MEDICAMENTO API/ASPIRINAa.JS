// Evento al hacer clic en el botón de "Buscar Información"
document.getElementById('buscarBtn').addEventListener('click', obtenerInformacionMedicamento);

// Evento al hacer clic en el botón de "Borrar Información"
document.getElementById('borrarBtn').addEventListener('click', borrarInformacionMedicamento);

// Función para obtener la información del medicamento
function obtenerInformacionMedicamento() {
const nregistro = '51347';

  // Construir la URL de la API
  const url = `https://cima.aemps.es/cima/rest/medicamento?nregistro=${nregistro}`;

fetch(url)
    .then(response => response.json())
    .then(data => mostrarInformacionMedicamento(data)) 
    .catch(error => console.error('Error:', error));

    }   
// Función para mostrar la información del medicamento en el DOM
function mostrarInformacionMedicamento(data) {
  const infoDiv = document.getElementById('medicamentoInfo');
  
  // Crear elementos HTML dinámicamente con los datos
  infoDiv.innerHTML = `
      <h2>${data.nombre}</h2>
      <p><strong>Código ATC:</strong> ${data.atcs[0].nombre}</p>
      <p><strong>Laboratorio Titular:</strong> ${data.labtitular}</p>
      <p><strong>Laboratorio Comercializador:</strong> ${data.labcomercializador}</p>
      <p><strong>Estado:</strong> ${data.estado.aut}</p>
      <img src="${data.fotos && data.fotos.length > 0 ? data.fotos[0].url : ''}" alt="Imagen del medicamento" style="max-width: 200px; display: ${data.fotos && data.fotos.length > 0 ? 'block' : 'none'};">
  `;
}

// Función para borrar la información del medicamento
function borrarInformacionMedicamento() {
  const infoDiv = document.getElementById('medicamentoInfo');
  infoDiv.innerHTML = ''; // Limpiar el contenido del div
}
function mostrarMensajeError() {
  const infoDiv = document.getElementById('medicamentoInfo');
  infoDiv.innerHTML = `
      <div class="error-message">
          <p>No ha sido posible encontrar información sobre este medicamento.</p>
          <p>Por favor, verifique el número de registro y vuelva a intentar.</p>
      </div>
  `;
}

