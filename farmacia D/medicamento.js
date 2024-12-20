// Función para obtener la información del medicamento
function obtenerInformacionMedicamento() {
  const nregistro = '51347';
  // const nregistro = '51347';
 
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
 
  // Crear elementos HTML dinámicamente
  infoDiv.innerHTML = `
      <h2>${data.nombre}</h2>
      <p><strong>Código ATC:</strong> ${data.atcs[0].nombre}</p>
      <table>
          <tr>
              <th>Principio Activo</th>
              <th>Cantidad</th>
              <th>Unidad</th>
          </tr>
          ${data.pactivos.split(', ').map(p => `
              <tr>
                  <td>${p.trim()}</td>
                  <td>-</td>
                  <td>-</td>
              </tr>
          `).join('')}
      </table>
      <p><strong>Laboratorio Titular:</strong> ${data.labtitular}</p>
      <p><strong>Laboratorio Comercializador:</strong> ${data.labcomercializador}</p>
      <p><strong>Estado:</strong> ${data.estado.aut}</p>
      <img src="${data.fotos && data.fotos.length > 0 ? data.fotos[0].url : ''}" alt="Imagen del medicamento" style="max-width: 300px; display: ${data.fotos && data.fotos.length > 0 ? 'block' : 'none'};">
  `;
}

// Ejecutar la función principal al cargar la página
window.onload = obtenerInformacionMedicamento;
