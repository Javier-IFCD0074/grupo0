/**********************************
 *** MANEJAR API DE RANDOM USER ***
 **********************************/

document.getElementById("botonUsuarios").addEventListener("click", mostrarDatosAPI_v4, true);
document.getElementById("borraUsuarios").addEventListener("click", limpiarDatosAPI, true);
let divUsuarios = document.querySelector("#cajaUsuarios");
let cuentaUsuarios = document.querySelector("#numUsuarios");

function mostrarDatosAPI_v4()
{
  console.log('Ha pulsado mostrar usuarios');
  let n=parseInt(cuentaUsuarios.value);
  fetch(`https://randomuser.me/api?results=${n}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        let mi_tabla = '<table border=1><thead><tr><th>Title</th><th>Nombre</th><th>Apellido</th><th>Foto</th></tr></thead><tbody>'
        for(i=0; i<n; i++)
        {   
            let persona = data.results[i].name;
            let url_foto = data.results[i].picture.thumbnail;
            console.log(persona);
            mi_tabla += filaUsario(persona, url_foto);
        }

        mi_tabla += '</tbody></table>';
        divUsuarios.innerHTML = mi_tabla;
    })  
}

// Compone codigo HTML para la fila de una tabla con datos del usuario
function filaUsario(individuo, url_imagen)
{
    let mi_fila = '<tr>'; // Empieza la fila, después van las celdas
    mi_fila += `<td> ${individuo.title} </td>`;
    mi_fila += `<td> ${individuo.first} </td>`;
    mi_fila += `<td> ${individuo.last} </td>`;
    // En esta celda va la foto
    mi_fila += `<td> ${ incrustarFoto(url_imagen, individuo.first) } </td>`;
    mi_fila += '</tr>'; // Final de fila

    return mi_fila;
}

// Genera el código HTML de un tag <img> con la URL de la foto
function incrustarFoto(url_foto, nombre)
{
    console.log('incrustarFoto() con valor ', url_foto);
    let imagen= `<img src="${url_foto}" title="${nombre}" alt="Foto de usuario">`;

    return imagen;
}

function limpiarDatosAPI()
{
    console.log('Ha pulsado botón para borrar usuarios');
    // Vaciar el contenido de la caja
    divUsuarios.innerHTML = '';
}

/****************************************
 * CÓDIGO PARA TRABAJAR CON NUESTRA API
 ****************************************/

document.getElementById("botonEco").addEventListener("click", pideEco, true);
document.getElementById("borraEco").addEventListener("click", quitaEco, true);
let mensajeEco = document.querySelector("#textoEco");
let p_eco = document.querySelector("#parrafoEco");

// Solicita la informacion JSON y rellena el parrafo
function pideEco()
{
    //p_eco.innerHTML = 'Hola Mundo';
    //const url = "http://localhost:3000/operacion=4+5";
    const url = `http://localhost:3000/eco=${mensajeEco.value}`;

    fetch(url)
        .then(res => res.text())
        .then(data =>{
             console.log(data);
             p_eco.innerHTML = data;
        })
}

function quitaEco()
{
    console.log('Ha pulsado borrar eco');
    p_eco.innerHTML = '';
}

//--------------------------------------
document.getElementById("botonActrices").addEventListener("click", pideActrices, true);
document.getElementById("borraActrices").addEventListener("click", quitaActrices, true);
let div_actrices = document.querySelector("#cajaActrices");

// Solicita la informacion JSON y rellena el div
function pideActrices()
{
    console.log('Ha pulsado el botón para ver lista de actrices');
    fetch("http://localhost:3000/belleza")
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        n=data.length;  // Averigua cuántos elementos hay
        console.log('Lista de actrices tiene ', n);
        let lista = '<ul>'; // Comienza lista HTML (desordenada)
        for (let i=0; i<n; i++)
        { // Para cada item de la lista, coge nombre y nacimiento
            lista += `<li>${data[i].nombre} (${data[i].nace}) </li>`;
        }
        lista += '</ul>'; // Terminar la lista con el tag adecuado
        div_actrices.innerHTML = lista;
    })
}

function quitaActrices()
{
    console.log('Ha pulsado borrar actrices');
    div_actrices.innerHTML = '';
}

//--------------------------------------
document.getElementById("botonOperar").addEventListener("click", pideOperar, true);
let opPlanteada = document.querySelector("#txtOperacion");
let opRespuesta = document.querySelector("#resOperacion");

// Solicita la informacion JSON y rellena caja de texto
function pideOperar()
{
    let datos=opPlanteada.value;
    console.log(`La operación es: ${datos}`);
    // Si tenemos info en la operacion, insertamos el signo igual
    if (datos.length!=0) datos='='+datos;

    const url = "http://localhost:3000/operacion=4+5";
    //let url = `http://localhost:3000/operacion=${txtOperacion.value}`;

    fetch(url)
        .then(res => res.text())
        .then(data =>{
             console.log('Respuesta: ', data);
             opRespuesta.value = data;
        })
}

/////////////////////////////////////
// EJEMPLOS SIN API DE NINGÚN TIPO //
/////////////////////////////////////

// Calculadora de la letra del DNI/NIE
// (18/01/25) Control de longitud y tratamiento de inicial
function calcLetra(dni)
{
    console.log(`calcletra(${dni})`);
    var JuegoCaracteres="TRWAGMYFPDXBNJZSQVHLCKET";
    let largo=dni.length
    if (largo!=8) return 'error'; // Sólo 8 es la longitud válida
    let inicial=dni.charAt(0);
    // La primera cifra puede ser una letra (extranjeros)
    switch (inicial.toUpperCase())
    {
        case 'X': inicial='0'; break; 
        case 'Y': inicial='1'; break; 
        case 'Z': inicial='2'; break; 
    }
    dni=inicial+dni.substring(1,largo);

    let Posicion= dni % 23;
    let Letra = JuegoCaracteres.charAt(Posicion);
    return Letra;
}

// Esta función no tiene en cuenta que los argumentos
// pueden ser texto y que el operador + en ese caso
// realiza una concatenación: junta a con b
function sumaV1(a,b)
{
    return a+b;
}

// Esta función convierte los argumentos
// en numeros y los suma adecuadamente
function sumaV2(a,b)
{
    return parseInt(a)+parseInt(b);
}