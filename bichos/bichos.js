document.getElementById("MostrarRegistros").addEventListener("click", mostrarDatosAPI_v3, true);
document.getElementById("limpiar").addEventListener("click", limpiarDatosAPI, true);

let contenido = document.querySelector("#contenido");


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
    mi_fila += `<td> ${bicho.nombre} </td>`;
    mi_fila += `<td> ${bicho.patas} </td>`;
    mi_fila += `<td> ${bicho.tipo} </td>`;
    //mi_fila += `<td> ${ incrustarFoto(url_imagen, bicho.first) } </td>`;
    mi_fila += '</tr>'; // Final de fila

    return mi_fila;
}


function mostrarDatosAPI_v3()
{

console.log('Ha pulsado mostrar aniaml');
fetch("http://localhost:3000")
    .then(res => res.json())
    .then(data =>{
        console.log(data);

        //let mi_tabla = '<table border=1><thead><tr><th>Title</th><th>Nombre</th><th>Apellido</th><th>Foto</th></tr></thead><tbody>'
          let mi_tabla = '<table border=1><thead><tr><th>nombre</th><th>patas</th><th>tipo</th></tr></thead><tbody>'
           let n=data.length;
        for(i=0; i<n; i++)
        {   
            let animal = data[i];

            let url_foto = 'leon,jpg';
            console.log(animal),
            mi_tabla += filaBicho(animal, url_foto);
        }

        mi_tabla += '</tbody></table>';
        contenido.innerHTML = mi_tabla;
    })
    
}


function limpiarDatosAPI()
{
    console.log('Ha pulsado borrar animal');
    // Vaciar el contenido de la caja
    contenido.innerHTML = '';
    // Vaciar el contenido de la tabla (cabecera y cuerpo)
    tCabecera.innerHTML = '';
    tCuerpo.innerHTML = '';
}