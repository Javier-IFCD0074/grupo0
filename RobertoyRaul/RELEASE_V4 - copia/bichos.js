document.getElementById("MostrarRegistros").addEventListener("click", mostrarDatosAPI_v3, true);
document.getElementById("limpiar").addEventListener("click", limpiarDatosAPI, true);


let contenido = document.querySelector("#contenido");

function mostrarDatosAPI()
{
console.log('Ha pulsado mostrar animal');
fetch("https://randomuser.me/api?results=5")
    .then(res => res.json())
    .then(data =>{
            console.log(data);
            let persona = data.results [0].name;
            console.log(persona);
            contenido.innerHTML = `${persona.title} `;
            contenido.innerHTML += ` ${persona.first} `;
            contenido.innerHTML += ` ${persona.last} <br>`;

        for (i=0; i<5; i++)
          contenido.innerHTML+=`${data.results[i].name.first}<br>`;

            let url_foto = data.results [0].picture.large;
            console.log(url_foto);
            let imagen= `<img src="${url_foto}" alt="Mi ejemplo">`;
            contenido.innerHTML += `${imagen}<br>`;
    })
    
}
  

function incrustarFoto(url_foto, nombre)
{
    console.log(url_foto);
    //let imagen= `<img src="${url_foto}" alt="Mi ejemplo">`;
    let imagen= `<a href="http://www.google.com"><img src="${url_foto}" title="${nombre}" alt="Mi ejemplo"></a>`;
    // contenido.innerHTML += `${imagen}<br>`;

    return imagen;

    // let codigoHTML = `<a href="${url_foto}"> Ver Foto </a>`;
    // return codigoHTML;
}

function filaBicho(bicho, url_imagen)
{
    let mi_fila = '<tr>'; // Empieza la fila
    mi_fila += `<td> ${bicho.title} </td>`;
    mi_fila += `<td> ${bicho.first} </td>`;
    mi_fila += `<td> ${bicho.last} </td>`;
    mi_fila += `<td> ${ incrustarFoto(url_imagen, bicho.first) } </td>`;
    mi_fila += '</tr>'; // Final de fila

    return mi_fila;
}


function mostrarDatosAPI_v3()
{

console.log('Ha pulsado mostrar usuario');
fetch("https://randomuser.me/api?results=5")
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        let mi_tabla = '<table border=1><thead><tr><th>Title</th><th>Nombre</th><th>Apellido</th><th>Foto</th></tr></thead><tbody>'
        for(i=0; i<5; i++)
        {   
            let persona = data.results[i].name;
            let url_foto = data.results[i].picture.thumbnail;
            console.log(persona);
            mi_tabla += filaBicho(persona, url_foto);
        }

        mi_tabla += '</tbody></table>';
        contenido.innerHTML = mi_tabla;
    })
    
}

function limpiarDatosAPI()
{
    console.log('Ha pulsado borrar usuario');
    // Vaciar el contenido de la caja
    contenido.innerHTML = '';
    // Vaciar el contenido de la tabla (cabecera y cuerpo)
    tCabecera.innerHTML = '';
    tCuerpo.innerHTML = '';
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
