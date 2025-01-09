document.getElementById("MostrarRegistros").addEventListener("click", mostrarDatosAPI_v3, true);
document.getElementById("limpiar").addEventListener("click", limpiarDatosAPI, true);
document.getElementById("rellenar").addEventListener("click", rellenar_tabla_v3, true);

let contenido = document.querySelector("#contenido");
let tCabecera = document.querySelector("#cabecera");
let tCuerpo   = document.querySelector("#cuerpo");

function mostrarDatosAPI()
{
console.log('Ha pulsado mostrar usuario');
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

function mostrarDatosAPI_v2()
{

console.log('Ha pulsado mostrar usuario');
fetch("https://randomuser.me/api?results=5")
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        let mi_tabla = '<table border=1><thead><tr><th>Title</th><th>Nombre</th><th>Apellido</th></tr></thead><tbody>'
        for(i=0; i<5; i++)
        {   
            let persona = data.results[i].name;
            console.log(persona);
            mi_tabla += '<tr>'; // Empieza la fila
            mi_tabla += `<td> ${persona.title} </td>`;
            mi_tabla += `<td> ${persona.first} </td>`;
            mi_tabla += `<td> ${persona.last} </td>`;
            mi_tabla += '</tr>'; // Final de fila
        }

        mi_tabla += '</tbody></table>';
        contenido.innerHTML = mi_tabla;

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

function filaUsario(individuo, url_imagen)
{
    let mi_fila = '<tr>'; // Empieza la fila
    mi_fila += `<td> ${individuo.title} </td>`;
    mi_fila += `<td> ${individuo.first} </td>`;
    mi_fila += `<td> ${individuo.last} </td>`;
    mi_fila += `<td> ${ incrustarFoto(url_imagen, individuo.first) } </td>`;
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
            mi_tabla += filaUsario(persona, url_foto);
        }

        mi_tabla += '</tbody></table>';
        contenido.innerHTML = mi_tabla;
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

function crear_tabla_v0()
{
    contenido.innerHTML = 'Tabla:<br>'
    for(i=0; i<5; i++)
    {   
        contenido.innerHTML += ` Fila ${i} <br>`;
        for(j=0; j<3; j++)
            contenido.innerHTML += ` - Celda ${j}`;
        contenido.innerHTML += '<br>';
    }
    contenido.innerHTML += 'Fin';
}

function crear_tabla_v1()
{
    contenido.innerHTML = '<table border=1><thead><tr><th>H1</th><th>H2</th><th>H3</th></tr></thead><tbody>'
    for(i=0; i<5; i++)
    {   
        contenido.innerHTML += '<tr>'; // Empieza la fila
        for(j=0; j<3; j++)
            contenido.innerHTML += `<td> Celda ${i}-${j} </td>`;
        contenido.innerHTML += '</tr>'; // Final de fila
    }
    contenido.innerHTML += '</tbody></table>';
}

function crear_tabla_v2()
{
    let mi_tabla = '<table border=1><thead><tr><th>H1</th><th>H2</th><th>H3</th></tr></thead><tbody>'
    for(i=0; i<5; i++)
    {   
        mi_tabla += '<tr>'; // Empieza la fila
        for(j=0; j<3; j++)
            mi_tabla += `<td> Celda ${i}-${j} </td>`;
        mi_tabla += '</tr>'; // Final de fila
    }
    mi_tabla += '</tbody></table>';
    contenido.innerHTML += mi_tabla;
}

function rellenar_tabla_v0()
{
    let sCabecera='<tr><th>H1</th><th>H2</th><th>H3</th></tr>';
    console.log(sCabecera);
    tCabecera.innerHTML = sCabecera;
    console.log(sCabecera);
    for(i=0; i<5; i++)
    {   
        tCuerpo.innerHTML += '<tr>'; // Empieza la fila
        for(j=0; j<3; j++)
            tCuerpo.innerHTML += `<td> Celda ${i}-${j} </td>`;
        tCuerpo.innerHTML += '</tr>'; // Final de fila
    }
}

function rellenar_tabla_v1()
{
    let fila='<tr><th>H1</th><th>H2</th><th>H3</th></tr>';
    console.log(fila);
    tCabecera.innerHTML = fila;
    console.log(fila);
    for(i=0; i<5; i++)
    {   
        fila='<tr>'; // Empieza la fila
        for(j=0; j<3; j++)
            fila += `<td> Celda ${i}-${j} </td>`;
        fila += '</tr>'; // Final de fila
        //console.log(fila);
        tCuerpo.innerHTML += fila; // Añadir fila //
    }
}

function rellenar_tabla_v2()
{
    let fila='<tr><th>H1</th><th>H2</th><th>H3</th></tr>';
    console.log(fila);
    tCabecera.innerHTML = fila;
    console.log(fila);
    for(i=0; i<5; i++)
    {   
        fila='<tr>'; // Empieza la fila
        for(j=0; j<3; j++)
            fila += `<td> Celda ${i*3 + j+1} </td>`;
        fila += '</tr>'; // Final de fila
        //console.log(fila);
        tCuerpo.innerHTML += fila; // Añadir fila
    }
}

function rellenar_tabla_v3()
{
    let fila='<tr><th>Multiplicando</th><th>Multiplicador</th><th>Producto</th></tr>';
    console.log(fila);
    tCabecera.innerHTML = fila;
    console.log(fila);

    // En este bucle preparamos las filas
    for(i=0; i<5; i++)
    {   
        fila='<tr>'; // Empieza la fila
        fila += `<td> 7 </td>`;
        fila += `<td> ${i} </td>`;
        fila += `<td> ${7*i} </td>`;

        /*for(j=0; j<3; j++)
            fila += `<td> Celda ${i*3 + j+1} </td>`; */

        fila += '</tr>'; // Final de fila
        //console.log(fila);
        tCuerpo.innerHTML += fila; // Añadir fila
    }
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