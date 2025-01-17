//document.getElementById("mostrar").addEventListener("click", mostrarCosas, true);
//document.getElementById("mostrar").addEventListener("click", mostrarDatosAPI, true);
document.getElementById("mostrar").addEventListener("click", crear_tabla_v2, true);
document.getElementById("limpiar").addEventListener("click", limpiarDatosAPI, true);
document.getElementById("rellenar").addEventListener("click", rellenar_tabla_v0, true);

let contenido = document.querySelector("#contenido");
let tCabecera = document.querySelector("#cabecera");
let tCuerpo   = document.querySelector("#cuerpo");

function mostrarDatosAPI()
{
//contenido.innerHTML = 'Hola Mundo';
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
        tCuerpo.innerHTML += fila; // Añadir fila
    }
}

function limpiarDatosAPI()
{
    console.log('Ha pulsado borrar usuario');
    contenido.innerHTML = '';
}