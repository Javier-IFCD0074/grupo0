// https://www.npmjs.com/package/mysql2

import mysql from 'mysql2/promise'
//const mysql =require('mysql2/promise');

const repositorio2 = {
    host: '192.168.1.243',
    user: 'TestUser',
    password: 'P@ssw0rd',
    database: 'world'
}

const repositorio = {
    //host: '10.57.22.106',
    host: 'localhost',
    user: 'burro',
    password: 'itet2024',
    database: 'world'
}

const conexion = await mysql.createConnection(repositorio);
//---------------------------------------------------------------

// Busca el elemento por su codigo y obtiene una referencia
async function dameCiudades() {
    //const filtro=['S','ESP'];
    //const [respuesta] = await conexion.query ("SELECT id,Name, District, Population as Tiempo FROM city WHERE LEFT(Name,1)=? AND CountryCode=?;", filtro);
    const [respuesta] = await conexion.query ("SELECT id,Name, District, Population FROM city;");
    console.log('dameCiudades() obtiene %d ciudades', respuesta.length);
    return respuesta;
}

// Busca el paises de Europa y obtiene una referencia
async function damePaises() {
    const filtro = ['Europe']
    const [respuesta] = await conexion.query ("SELECT Name FROM country WHERE Continent=?;", filtro);
    console.log('damePaises() obtiene %d paises', respuesta.length);
    return respuesta;
} 

// Busca el paises de Europa y obtiene una referencia
async function damePaisesV2(continente) {
    const respuesta = await conexion.query ("SELECT Name FROM country WHERE Continent=?;", [continente]);
    console.log('damePaises(',continente,') obtiene ', respuesta[0].length, ' elementos');
    return respuesta;
}

// Busca el elemento por su codigo y obtiene una referencia
async function damePaisesContinente(filtro) {
    const [respuesta] = await conexion.query ("SELECT Name FROM country WHERE Continent=?;", filtro);
    console.log('damePaisesContinente() obtiene %d paises', respuesta.length);
    return respuesta;
}

/*
sentencia='SELECT id, Name, District, Population FROM city';
let condicion='';
--------------------------------------
if (inicial)
 condicion=" LEFT(NAME,1)='" +inicial + "'";

if (codigoPais)
{
    // Esta vacio??
    if (condicion.length > 0) condicion+=" AND";
    condicion+=" COUNTRYCODE='" + codigoPais+ "'";
}

------------------------------

if (condicion.length > 0)
{
sentencia+= ' WHERE'+ condicion;
}


*/

async function dameCiudadesFiltro(Caracter, Pais)
{
    let filtro=[];
    console.log(Caracter);    
    if (Caracter)
        console.log('Me llega caracter');
    console.log(Pais);

    let sentenciaSQL="SELECT id, Name, District, Population FROM city WHERE 1=1";
    console.log(sentenciaSQL);
    // if (Caracter!==undefined) {
    if (Caracter) {
        sentenciaSQL+=" AND LEFT(Name,1)=?";
        filtro.push(Caracter);
    } 
    // if (Pais!==undefined) {
    if (Pais) {
        sentenciaSQL+=" AND CountryCode=?";
        filtro.push(Pais);
    }
    sentenciaSQL+=';';
    console.log('sentencia SQL:',sentenciaSQL);
    console.log('filtro SQL:', filtro);
    // const [respuesta] = await conexion.query ("SELECT id,Name, District, Population FROM city WHERE CountryCode=?;", filtro);
    const [respuesta] = await conexion.query (sentenciaSQL, filtro);
    console.log('dameCiudadesFiltro() obtiene %d ciudades', respuesta.length);
    return respuesta;
}


// Busca el elemento por su codigo y obtiene una referencia
async function dameCiudad(codigo) {
    const [captura] = await conexion.query ("SELECT id,Name, District, Population FROM city WHERE id=?;", [codigo]);
    if (captura.length!=0)
        console.log('Encontrada ciudad:', captura);
    else
        console.log('Ciudad no encontrada');
    return captura;
}

/*
// Busca el elemento por su codigo y obtiene una referencia
async function damePaisesContinente(codigo) {
    const [captura] = await conexion.query ("SELECT Name FROM Country WHERE Continent=?;", [codigo]);
    if (captura.length!=0)
        console.log('damePaisesContinente() obtiene %d paises', captura.length);
    else
        console.log('Continente no encontrado');
    return captura;
} */

// Añade una nueva ciudad en la base de datos
async function insertaCiudad(campos) {
    const sentenciaSQL="insert into city (Name, CountryCode, District, Population) values (?,?,?,?);";

    let codigoPais='ESP'; // Valor por defecto (España)
    if ('CountryCode' in campos) // Posibilidad de indicar otro país
        codigoPais = campos.CountryCode;

    console.log("Sentencia:",sentenciaSQL);
    // Comprobación de que se indican todos los campos
    if ('Name' in campos && 'District' in campos && 'Population' in campos) {
        const [resultado] = await conexion.query (sentenciaSQL,
            [campos.Name, codigoPais,
             campos.District, parseInt(campos.Population)]);
        console.log('Nuevo animal:', resultado);
        if ('affectedRows' in resultado) {
            if (resultado.affectedRows == 1)
            {
                console.log('Nueva ciudad:', resultado.insertId);
                return true;
            }
        }
        console.log('Error insertar registro');
        return true;
    }
    else {
        console.log('Error insertando:',campos);
        return false;
    }
}

// Intenta eliminar una ciudad de la lista, buscando el código
async function eliminaCiudad(codigo) {
    const sentenciaSQL="delete from world.city where id=?;";
    // Buscamos el índice del elemento que deseamos borrar
    const [resultado] = await conexion.query (sentenciaSQL, codigo);
    //console.log('Resultado:', resultado);
    //console.log('Afectado:', resultado.affectedRows);

    if ('affectedRows' in resultado) {
        if (resultado.affectedRows == 1)
            return true;
    }
    console.log('Ciudad no encontrada');
    return false;
}

// Intenta cambiar los datos de una Ciudad
// Puede fallar si el codigo de la ciudad no existe o si
// el usuario no tiene privilegios para hacer update.
// Otro fallo puede ocurrir si los campos son inadecuados 
function modificaCiudad(candidato, campos) {
    let cambiado=false;
    // Comprueba si debe cambiar nombre
    if ('nombre' in campos) {
        candidato.nombre=campos.nombre;
        cambiado=true;
    }
    // Comprueba si debe cambiar la población
    if ('habitantes' in campos) {
        candidato.habitantes=parseInt(campos.habitantes); // Convierte a número !!!
        cambiado=true;
    }
    return cambiado;
}

//////////////////////////////////////////////////////////
// Exportar los elementos públicos que va a usar la API //
//////////////////////////////////////////////////////////

/*
module.exports = {
    dameCiudades,
    dameCiudad,
    insertaCiudad,
    modificaCiudad,
    eliminaCiudad
}*/

const urbano = {
    dameCiudades,
    dameCiudadesFiltro,
    dameCiudad,
    insertaCiudad,
    modificaCiudad,
    eliminaCiudad,
    damePaises,
    damePaisesV2,
    damePaisesContinente
}

//module.exports = urbano;
export default urbano;
