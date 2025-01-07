
document.getElementById("mostrar").addEventListener("click", mostrarDatosAPI, true);
document.getElementById("limpiar").addEventListener("click", limpiarDatosAPI, true);

let contenido = document.querySelector("#contenido");
let tCabecera = document.querySelector("#cabecera");
let tCuerpo = document.querySelector("#cuerpo");

function mostrarDatosAPI() {
    console.log('Ha pulsado mostrar usuario');
    fetch("https://randomuser.me/api?results=5")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let tableHeader = `<tr>
                                <th>Title</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Photo</th>
                               </tr>`;
            tCabecera.innerHTML = tableHeader;

            let tableBody = '';
            data.results.forEach(user => {
                tableBody += `<tr>
                                <td>${user.name.title}</td>
                                <td>${user.name.first}</td>
                                <td>${user.name.last}</td>
                                <td><img src="${user.picture.large}" alt="User Photo"></td>
                              </tr>`;
            });
            tCuerpo.innerHTML = tableBody;
        })
        .catch(error => console.error('Error fetching data:', error));
}

function limpiarDatosAPI() {
    tCabecera.innerHTML = '';
    tCuerpo.innerHTML = '';
}