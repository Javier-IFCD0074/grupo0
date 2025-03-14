let host   = 'localhost';
let port   = 3000;

  /////////////////////////////
 // FUNCIONES MUY GENÉRICAS //
/////////////////////////////

// Envia mensaje de texto a consola y aviso emergente
function avisar(mensaje) {
    console.log(mensaje);
    alert(mensaje);
}

// Funcion genérica que rellena un div con una página web
function cargarPaginaEnCaja(idCaja, peticion) {
    if (typeof(peticion)=='string') // cadena de texto (URL)
        console.log(peticion,' ---> cargarPaginaEnCaja() ');
    else  // 'object' --> objeto de tipo request
        console.log(peticion.url,' ---> cargarPaginaEnCaja() ');

    fetch(peticion)  // Obtener la página web
        .then(res => res.text()) // Extraer la información
        .then(pagina => {  // Depositarla en la ubicación seleccionada
            document.getElementById(idCaja).innerHTML = pagina;
        })
        .catch(error => {
            avisar(url+'\nError al cargar la página: '+error);
        });
}

// Funcion genérica que consulta datos al API
function leerDatosAPI(url, funcion){
    console.log(url,' ---> leerDatosAPI() ');
    fetch(url)  // Obtener los datos (por defecto el method es GET)
        .then(res => res.json()) // Extraer la información
        .then(datos => {
            funcion(datos); // Devuelve la información
        })
        .catch(error => {
            avisar('Error al cargar datos '+error);
        });
}

// Compone una fila para una tabla HTML
function generaFila(lista, esCabecera)
{
    let tipo= esCabecera ? 'h' : 'd'; // Para tener <th> o <td>

    let miFila = '<tr>'; // Empieza la fila
    for (let i=0; i<lista.length; i++)
        miFila += `<t${tipo}> ${lista[i]} </t${tipo}>`;
    miFila += '</tr>'; // Final de fila

    return miFila;
}

/////////////////////////////////////////
// E S T A D O   Y   C O N T R O L E S //
/////////////////////////////////////////

// Este cliente se puede conectar a la API en un contexto
// de ver animales (estado=fauna) o para consultar la base
// de datos de ciudades internacionales (estado=mundo)
let estado = 'fauna';

function estableceEstado() {
    elemento=document.getElementById('opciones');
    estado=elemento.value;
    console.log('valor=', estado );
}

function cargarControles(opcion) {
    // Aquí se compone el nombre del archivo. Por ejemplo: faunaRead.html
    const url= estado + opcion + '.html';
    cargarPaginaEnCaja('controles', url);
}

//------------------------------------------------------------

// Obtiene una página web concreta y rellena el div llamado resultado
function cargarAyuda() {
    cargarPaginaEnCaja('resultado','ayuda.html');
}

  ///////////////////////////////////////////
 // MANEJO COMÚN DE DATOS (FAUNA Y MUNDO) //
///////////////////////////////////////////

// Compone el comienzo de la URL de la API: host, puerto y opción
function dameURLbase(opcion) {
    return `http://${host}:${port}/${opcion}`; // URL base
}

// Obtener el dato que fue rellenado en un elemento de la página
function dameValor(selector) {
    if (!selector) {
        console.log('Llamada a dameValor(): hay que indicar el selector');
        return;
    }
    console.log('cargarDatos(',selector,')');
    return document.querySelector(selector).value;
}

// Hace una tabla HTML a partir de una lista de objetos
function generaTablaHTML(datos) {
    console.log('hacerTabla()\n',datos);
    // Datos puede traer una lista de objetos o un objeto aislado
    if (!Array.isArray(datos)) // Si no es una lista
        datos=[datos]; // Crea una lista de solo un elemento
    const claves=Object.keys(datos[0]); // Averigua las claves

    // let miTabla = '<table border=1><thead><tr><th>Código</th><th>Nombre</th><th>Patas</th></tr></thead><tbody>';
    let miTabla = '<table border=1><thead>'+ generaFila(claves,true)+ '</thead><tbody>';
    for(let i=0; i< datos.length; i++)
    {
        const item=datos[i];
        // Prepara una lista con todos los campos del elemento
        const campos=[]; // Crea lista vacía
        for(j=0;j<claves.length;j++)
            campos.push(item[claves[j]]); // Añade cada campo
        console.log(campos);
        miTabla += generaFila(campos,false);
    }
    miTabla += '</tbody></table>';
    document.getElementById('resultado').innerHTML = miTabla;
}

function cargarTablaJSON(clave) {
    let tieneClave=false;
    if (clave) tieneClave=true;
    console.log('clave=',clave);

    // Preparar la peticion
    let opcion = 'datos'; // Por defecto usar el API de animales
    if (estado=='mundo') opcion='civitas';
    // Completa la url poniendo el código al final
    let url = dameURLbase(opcion); // URL completa

    if (clave) {
        const codigo = dameValor(clave);
        url+='/'+codigo; // Completa la url poniendo el código al final
        console.log('Leer elemento con codigo=',codigo);
    }
    leerDatosAPI(url, generaTablaHTML);
}

// Antes de eliminar o modificar un elemento, podemos presentar 
// previamente los datos. Esta función trata animales o ciudades
// El selector nos indica donde está el codigo elegido.
function cargaPreviaDatos(selector) {
    const codigo = dameValor(selector);

    if (!codigo || codigo.length==0) {
        console.log('Llamada a cargarDatos() con problemas en el selector', selector);
        alert("Por favor, introduce un número válido.");
        return;
    }

    let opcion = 'datos'; // Por defecto usar el API de animales
    if (estado=='mundo') opcion='civitas';

    // Completa la url poniendo el código al final
    let url = dameURLbase(opcion)+`/${codigo}`; // URL completa

    // Al trabajar con promesas es necesario indicar la función
    // que hará el tratamiento de datos, una vez lleguen
    leerDatosAPI(url, rellenarCampos);
}

function rellenarCampos(objeto) {
    if (!objeto) {
        avisar('rellenarCampos() necesita un parámetro JSON');
        return;
    }
    console.log(objeto);
    // Rellena los campos del elemento
    switch (estado) {
        case 'fauna':
            document.querySelector('#nombre').value = objeto.nombre;
            document.querySelector('#patas').value  = objeto.patas;
            break;
        case 'mundo':
            document.querySelector('#nombre').value = objeto.nombre;
            document.querySelector('#comunidad').value  = objeto.district;
            document.querySelector('#pais').value  = objeto.countrycode;
            document.querySelector('#poblacion').value  = objeto.population;
            break;
        default:
            avisar('Valor incorrecto en rellenarCampos()\nestado='+estado);
    }
}


// Para borrar animales o ciudades, usando el código
function eliminarElemento(selector) {
    const codigo = dameValor(selector);
    if (!codigo || codigo.length==0) {
        console.log('Llamada a eliminarElemento() con problemas en el selector', selector);
        alert("Por favor, introduce un número válido.");
        return;
    }

    // Preparar la peticion
    let opcion = 'datos'; // Por defecto usar el API de animales
    if (estado=='mundo') opcion='civitas';
    // Completa la url poniendo el código al final
    let url = dameURLbase(opcion)+`/${codigo}`; // URL completa

    // Por defecto el method es GET, así indicamos otro
    const peticion = new Request( url, { method: "DELETE" });
    cargarPaginaEnCaja('resultado', peticion);
}

  ///////////////////////////////////////
 // MANEJO DE API DE ANIMALES (FAUNA) //
///////////////////////////////////////

function insertarAnimal() {
    const animal = dameValor('#nombre'),
        cantidad = dameValor('#patas');

    if (!animal   || animal.length==0 ||
        !cantidad || cantidad.length==0) {
        console.log('Llamada a insertarAnimal() con problemas en selectores nombre y/o patas', selector);
        alert("Por favor, introduce datos válidos.");
        return;
    }

    // Preparar la peticion
    const url = dameURLbase('datos')+`?nombre=${animal}&patas=${cantidad}`;
    // Por defecto el method es GET, así indicamos otro
    const peticion = new Request( url, { method: "POST" });

    cargarPaginaEnCaja('resultado', peticion);
}

function modificarAnimal() {
    const codigo   = dameValor('#codigoAnimal'),
          animal   = dameValor('#nombre'),
          cantidad = dameValor('#patas');

    if (!codigo   || codigo.length==0 ||
        !animal   || animal.length==0 ||
        !cantidad || cantidad.length==0) {
        console.log('Llamada a insertarAnimal() con problemas en selectores nombre y/o patas', selector);
        alert("Por favor, introduce datos válidos.");
        return;
    }

    // Preparar la peticion
    const url = dameURLbase('datos')+`/${codigo}?nombre=${animal}&patas=${cantidad}`;
    // Por defecto el method es GET, así indicamos otro
    const peticion = new Request( url, { method: "PUT" });

    cargarPaginaEnCaja('resultado', peticion);
}



// https://www.w3schools.com/js/js_htmldom_nodes.asp
function probar() {
    const caja = document.getElementById("resultado");
    const para = document.createElement("p");
    let node = document.createTextNode("Texto nuevo");
    para.appendChild(node);
    caja.appendChild(para);

    const lista = document.createElement("ul");
    for (i=0;i<4;i++) {
        item = document.createElement("li");
        node = document.createTextNode("Elemento #"+(i+1));
        item.appendChild(node);
        lista.appendChild(item);
    }
    caja.appendChild(lista);

}