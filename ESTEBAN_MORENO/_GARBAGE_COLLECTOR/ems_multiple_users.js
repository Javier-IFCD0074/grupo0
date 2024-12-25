//document.getElementById("mostrar").addEventListener("click", mostrarCosas, true);
document.getElementById("mostrar").addEventListener("click", mostrarDatosAPI_Multiple_Users_V0, true);
//document.getElementById("mostrar").addEventListener("click", crear_tabla_V3, true);
document.getElementById("limpiar").addEventListener("click", limpiarDatosAPI, true);

let contenido = document.querySelector("#contenido");

function mostrarDatosAPI_Multiple_Users_V1()
{
//contenido.innerHTML = 'Hola Mundo';
console.log('Ha pulsado mostrar usuario');
fetch("https://randomuser.me/api/?results=5")
    .then(res => res.json())
    .then(data =>{
            for (i=0;i<5;i++)
            {
                //console.log(data);
                let persona = data.results [i].name;
                //console.log(persona);
                contenido.innerHTML = `${persona.title} `;
                contenido.innerHTML += ` ${persona.first} `;
                contenido.innerHTML += ` ${persona.last} <br>`;
                let url_foto = data.results [0].picture.large;
                console.log(url_foto);
                let imagen= `<img src="${url_foto}" alt="Mi ejemplo">`;
                contenido.innerHTML += `${imagen}<br>`;
            }
    })
    
}

function mostrarDatosAPI_Multiple_Users_V0()
{
//contenido.innerHTML = 'Hola Mundo';
console.log('Ha pulsado mostrar usuario');
fetch("https://randomuser.me/api/?results=5")
    .then(res => res.json())
    .then(data =>{
            console.log(data);
            let persona = data.results [0].name;
            console.log(persona);
            contenido.innerHTML = `${persona.title} `;
            contenido.innerHTML += ` ${persona.first} `;
            contenido.innerHTML += ` ${persona.last} <br>`;

        for(i=0;i<5;i++)
            contenido.innerHTML += `${data.results [i].name.first}<br>`;                
            
            let url_foto = data.results [0].picture.large;
            console.log(url_foto);
            let imagen= `<img src="${url_foto}" alt="Mi ejemplo">`;
            contenido.innerHTML += `${imagen}<br>`;            
    })
    
}


function mostrarDatosAPI()
{
//contenido.innerHTML = 'Hola Mundo';
console.log('Ha pulsado mostrar usuario');
fetch("https://randomuser.me/api/")
    .then(res => res.json())
    .then(data =>{
            console.log(data);
            let persona = data.results [0].name;
            console.log(persona);
            contenido.innerHTML = `${persona.title} `;
            contenido.innerHTML += ` ${persona.first} `;
            contenido.innerHTML += ` ${persona.last} <br>`;

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

function crear_tabla_V4()
{
    fila.innerHTML = '<Table border=1>'
    for(i=0; i<5; i++)
    {
        fila='<tr>'
        for(j=0; j<3; j++)
            fila.innerHTML += `<td> Celda ${i*3 + j+1} </td>`;
        fila.innerHTML += '</tr>';         // Termina Fila.
    }
    fila.innerHTML += '</table>'
}

function crear_tabla_V3()
{
    contenido.innerHTML = '<Table border=1>'
    for(i=0; i<5; i++)
    {
        contenido.innerHTML += ` <br><tr>`;     // Salta Linea y Comienza Fila.
        for(j=0; j<3; j++)
            contenido.innerHTML += `<td> Celda ${i} - ${j} </td>`;
        contenido.innerHTML += '</tr>';         // Termina Fila.
    }
    contenido.innerHTML += '</table>'
}

function crear_tabla_V2()
{
    contenido.innerHTML = '<Table border=1>'
    for(i=0; i<5; i++)
    {
        contenido.innerHTML += ` <tr>`;     // Comienza Fila.
        for(j=0; j<3; j++)
            contenido.innerHTML += `<td> Celda ${i} - ${j} </td>`;
        contenido.innerHTML += '</tr>';     // Termina Fila.
    }
    contenido.innerHTML += '</table>'
}

function crear_tabla_V1()
{
    contenido.innerHTML = 'Tabla:<br>'
    for(i=0; i<5; i++)
    {
        contenido.innerHTML += ` Fila ${i} <br>`;
        for(j=0; j<3; j++)
            contenido.innerHTML += ` -Celda ${j}`;
        contenido.innerHTML += '<br>';
    }
}

function crear_tabla_V0()
{
    contenido.innerHTML = 'Tabla:<br>'
    for(i=0; i<5; i++)
    {
        contenido.innerHTML += ` Fila ${i} <br>`;
        for(j=0; j<3; j++)
            contenido.innerHTML += ` Celda ${j} <br>`;
    }
}

function limpiarDatosAPI()
{
    console.log('Ha pulsado borrar usuario');
    contenido.innerHTML = '';
}