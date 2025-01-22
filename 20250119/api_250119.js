/*
    CÓDIGO DEL SERVIDOR API (17 de Enero)
    Hay un menu inicial en HTML con varias opciones
    +-----------+-----------------------------------------------------------+
    | COMANDO   | COMPORTAMIENTO                                            |
    +-----------+-----------------------------------------------------------+
    | eco       | devuelve un mensaje similar al enviado                    |
    | operacion | realiza calculos matematicos (inacabado)                  |
    | belleza   | lista JSON de chicas guapas, pero solo algunas XD         |
    | saludo    | un mensaje cordial, en formato HTML                       |
    | inicio    | genera el menu principal (tambien sale si no hay comando) |
    | <ERROR>   | La respuesta cuando para preguntas imprevistas            |
    +-----------+-----------------------------------------------------------+
*/
const http = require('http');

// Diferentes formatos para cabecera de respuesta
const tipoContenido = [
    'application/json',        // Usada para objetos JSON
    'text/html;charset=utf-8', // Indica formato HTML
    'text/plain;charset=utf-8' // Para texto plano (no interpretar)
];

/*
var url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
}*/

let cont=0;
http.createServer(function(req, res) {
    cont++;
    let pregunta=req.url;
    let largo=pregunta.length; // Longitud de la pregunta

    console.log('Llega una solicitud #',cont,'(largo=',largo, ') -', pregunta);

    //let parsedURL=url.parse(req.url, true);
    //console.log('\t - protocol: ', parsedURL.hostname);

    /* Primer ejemplo en clase (15/01/2025)
    if (pregunta.startsWith('/eco='))
        respuesta=devuelveEco(pregunta);
    else
        respuesta="No sé qué dices";
    */
    
    let comando = 'inicio'; // Valor por defecto
    let formatoJSON=false,  formatoHTML=false; // Por defecto sin formato
    let haySignoIgual=false; // Importante en algun comando: eco, operacion, ...

    /***************************************/
    // ANALIZA PREGUNTA Y AVERIGUA COMANDO 
    /***************************************/
    if (pregunta.charAt(0)=='/') // Comprueba primer caracter
    {
        lugar=pregunta.search('='); // Busca posicion de signo '='

        if (lugar>=0)
            haySignoIgual=true;
        else
            lugar=largo; // Si no lo encuentra, establece este valor (todo el largo)
 
        comando=pregunta.substring(1,lugar); // Extrae el comando de la URL
        if (largo==1) // Cuando solamente llega un caracter, es decir '/'
            comando='inicio';
    }
    else // Cuando no viene '/' al comienzo (casi imposible que ocurra)
        comando='inicio';

    /**************************************************/
    // TRATAMIENTO DEL COMANDO EN FUNCIONES SEPARADAS 
    /**************************************************/
    switch (comando)
    {
        case 'eco': // (15/01/2025)
            respuesta=devuelveEco(pregunta);
            break;
        case 'operacion': // (15/01/2025)
            if (lugar==largo) // Si 
                respuesta='No hay datos';
            else
                respuesta=operacion(pregunta);
            break;
        case 'belleza': // (16/01/2025)
            respuesta=hermosura();
            formatoJSON=true;
            break;
        case 'saludo': // (15/01/2025)
            respuesta=saludar();
            formatoHTML=true;
            break;
        case 'inicio': // (17/01/2025)
            respuesta=paginaPrincipal();
            formatoHTML=true;
            break;
        default:  // (15/01/2025)
            //respuesta="No sé qué dices";
            respuesta=mensaje("No sé qué dices","red");
            formatoHTML=true;
    }

    /****************************************/
    // TRATAMIENTO DEL FORMATO DE RESPUESTA 
    /****************************************/

    let tipo=2; // Formato por defecto, texto plano

    if (formatoJSON)
        tipo=0
    else
    {
        if (formatoHTML)
            tipo=1;
        else
            tipo=2;
    }

    // Escribe la cabecera en la respuesta (algo multi-uso, dinamico)
    res.writeHead(200, // OK - Todo ha ido bien
        { 'Content-Type': tipoContenido[tipo] , // Formato de respuesta
        'access-control-allow-origin':'http://localhost:8000' // Tratar el CORS
    });

    // ***** TRATAMIENTO DE CABECERA (mas explicito, estatico y sin CORS) *********/
    //res.writeHead(200, { 'Content-Type': 'text/plain' });
    /*
    if (formatoJSON)
        res.writeHead(200, { 'Content-Type': 'application/json' });
    else
    {
        if (formatoHTML)
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        else
            res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
    }
    */

    /****************************************/
    // ESCRIBE RESPUESTA 
    /****************************************/
    res.write(respuesta);
    res.end();    

}).listen(3000, 'localhost', () => { // Indicamos hostname y puerto
    console.log('Escuchando en localhost:3000');
});
//==============================================================


// Ejemplo de respuesta en texto plano, usando 
// http://localhost:3000/eco=Una casa en la playa
// RESPUESTA:  Has dicho 'Una casa en la playa'
function devuelveEco(pregunta)
{
    let largo=pregunta.length;
    let lugar=pregunta.search('=');
    respuesta=`Has dicho '${pregunta.substring(lugar+1,largo)}'`;
    console.log('Se prepara:',respuesta);
    respuesta=respuesta.replaceAll('%20',' ');
    console.log('y responde:',respuesta);

    return respuesta;
}

// Prototipo de funcion que debe calcular cosas
// Falta desarrollo para que resulte mas practico
// Devuelve diferentes respuestas segun la pregunta
// Probar estas URL y se ven estos resultados:
//    http://localhost:3000/operacion     -> Faltan datos
//    http://localhost:3000/operacion=4+6 -> Es una suma
//    http://localhost:3000/operacion=7-5 -> Operacion desconocida
function operacion(datos)
{
    console.log('Datos de entrada en operacion(): ',datos);
    if (datos.indexOf('+')>0)
    {
        respuesta='Es una suma';
    }
    else
        respuesta='Operación desconocida';

    return respuesta;
}

// Array de sencillos objetos JSON como ejemplo
// Se utiliza en la funcion hermosura()
guapas = [
    {nombre:'Marilyn Monroe', nace:1926},
    {nombre:'Ava Gardner', nace:1922},
    {nombre:'Scarlett Johansson', nace:1984}
];

// Funcion que devuelve formato JSON para ejemplo del API
function hermosura()
{
    console.log('Respuesta a enviar:', guapas);
    return JSON.stringify(guapas);
}

// Ejemplo de mensaje fijo con formato HTML
function saludar()
{
    console.log('Saludamos al usuario');
    return '<p>Hola <b style="color:green">amigos</b></p>';
}

// Ejemplo de mensaje y comportamiento dinamico 
// compone una cadena HTML con algo de CSS
function mensaje(texto, color)
{
    return `<p>Mensaje: <b style="color:${color}">${texto}</b></p>`;
}

// Ejemplo de componer un sencillo contenido HTML
function paginaPrincipal()
{
    let pagina= '<h1>Menú de inicio</h1>';
    pagina += '<ul>';
    pagina += '<li>Uno</li>';
    pagina += '<li>Dos</li>';
    pagina += '<li>Tres</li>';
    pagina += '</ul>';
    return pagina;
}