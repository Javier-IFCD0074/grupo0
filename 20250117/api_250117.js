/*
    CÓDIGO DEL SERVIDOR WEB (15 de Enero)
    Hay un menú inicial con varias opciones
    - operacion: permite calcular
    - belleza: lista de chicas guapas
    - saludo: un mensaje HTML
*/

const http = require('http');

const tipoContenido = [
    'application/json',
    'text/html;charset=utf-8',
    'text/plain;charset=utf-8'
];

let cont=0;
http.createServer(function(req, res) {
    cont++;
    let pregunta=req.url;
    console.log('Llega una solicitud #',cont, '-', pregunta);

    /*
    if (pregunta.startsWith('/eco='))
        respuesta=devuelveEco(pregunta);
    else
        respuesta="No sé qué dices";
    */
    
    let comando = 'Nada';
    let jotason=false,  formatoHTML=false;
    let largo=pregunta.length;
    
    if (pregunta[0]=='/')
    {
        lugar=pregunta.search('=');
        if (lugar==-1)
            lugar=largo;
        comando=pregunta.substring(1,lugar);
        console.log('largo=',largo);
        if (largo==1)
            comando='inicio';
    }
    else
        comando='inicio';

    switch (comando)
    {
        case 'inicio': 
            respuesta=inicio();
            formatoHTML=true;
            break;
        case 'eco':
            respuesta=devuelveEco(pregunta);
            break;
        case 'operacion':
            if (lugar==largo)
                respuesta='No hay datos';
            else
                respuesta=operacion(pregunta);
            break;
        case 'belleza':
            respuesta=hermosura();
            jotason=true;
            break;
        case 'saludo':
            respuesta=saludar();
            formatoHTML=true;
            break;
        default:
            //respuesta="No sé qué dices";
            respuesta=mensaje("No sé qué dices","red");
            formatoHTML=true;
    }

    //res.writeHead(200, { 'Content-Type': 'text/plain' });
    /*
    if (jotason)
        res.writeHead(200, { 'Content-Type': 'application/json' });
    else
    {
        if (formatoHTML)
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        else
            res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
    }
            */

    let tipo=2; // Formato por defecto, texto plano

    if (jotason)
        tipo=0
    else
    {
        if (formatoHTML)
            tipo=1;
        else
            tipo=2;
    }

    res.writeHead(200, { 'Content-Type': tipoContenido[tipo] ,
        'access-control-allow-origin':'http://localhost:8000'
    });

    res.write(respuesta);
    res.end();    

}).listen(3000, 'localhost', () => {
    console.log('Escuchando en localhost:3000');
});

function devuelveEco(pregunta)
{
    let largo=pregunta.length;
    let lugar=pregunta.search('=');
    respuesta=`Has dicho '${pregunta.substring(lugar+1,largo)}'`;
    console.log(respuesta);
    respuesta=respuesta.replaceAll('%20',' ');
    console.log(respuesta);

    return respuesta;
}

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

guapas = [
    {nombre:'Marilyn Monroe', nace:1956},
    {nombre:'Ava Gardner', nace:1947},
    {nombre:'Scarlett Johansson', nace:1998}
];

function hermosura()
{
    return JSON.stringify(guapas);
}

function saludar()
{
    return '<p>Hola <b style="color:green">amigos</b></p>';
}

function mensaje(texto, color)
{
    return `<p>Mensaje: <b style="color:${color}">${texto}</b></p>`;
}

function inicio()
{
    let pagina= '<h1>Menú de inicio</h1>';
    pagina += '<ul>';
    pagina += '<li>Uno</li>';
    pagina += '<li>Dos</li>';
    pagina += '<li>Tres</li>';
    pagina += '</ul>';
    return pagina;
}