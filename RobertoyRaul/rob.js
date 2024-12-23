document.getElementById("mostrar").addEventListener("click", mostrarDatosAPI, true);
//document.getElementById("mostrar").addEventListener("click", Crear_tabla_v0, true);
document.getElementById("mostrar").addEventListener("click", Crear_tabla_v1, true);
//document.getElementById("limpiar").addEventListener("click", limpiarDatosAPI, true);
document.getElementById("limpiar").addEventListener("click", limpiarDatosAPI, true);

let contenido = document.querySelector("#contenido");

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
            contenido.innerHTML+= ` ${data.results[i].name.first} <br>`;


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

function Crear_tabla_v0()
{
    contenido.innerHTML = 'Tabla <br>'
    for(i=0; i<3; i ++)
    {   
        contenido.innerHTML +=    `Fila ${i} <br>`;
        for(j=0; j<3; j ++)
            contenido.innerHTML += ` - Celda ${j} `;
        contenido.innerHTML +=  '<br>'; 
    }
    contenido.innerHTML +=  'fin';
}
function Crear_tabla_v1()
{
    contenido.innerHTML = '<Table border=1>'
    for(i=0; i<3; i ++)
    {   
        contenido.innerHTML +=    `<tr>`; //EMPIEZA LA FILA
        for(j=0; j<3; j ++)
            contenido.innerHTML += ` <td> Celda ${i} ${j} </td>`;
        contenido.innerHTML +=  '</tr>'; //FINAL DE LA FILA
    }
    contenido.innerHTML +=  'fin';
}

function limpiarDatosAPI()
{
    console.log('Ha pulsado borrar usuario');
    contenido.innerHTML = '';
}