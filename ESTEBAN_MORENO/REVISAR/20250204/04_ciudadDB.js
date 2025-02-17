// https://www.npmjs.com/package/mysql2

import mysql from 'mysql2/promise'
//const mysql =require('mysql2/promise');


const repositorio = {
    host: '192.168.1.243',
    user: 'TestUser',
    password: 'P@ssw0rd',
    database: 'world'
}

const repositorio2 = {
    host: 'localhost',
    user: 'burro',
    password: 'itet2024',
    database: 'world'
}

const conexion = await mysql.createConnection(repositorio2);
//---------------------------------------------------------------

let animales = [
    {codigo:1, nombre:'caballo', patas:4},
    {codigo:2, nombre:'tigre', patas:4},
    {codigo:3, nombre:'merluza', patas:0},
    {codigo:4, nombre:'gallina', patas:2},
    {codigo:5, nombre:'gorrión', patas:3}, // Error en patas (para modificar)
    {codigo:6, nombre:'SPIDER', patas:8},  // Nombre inadecuado (para modificar)
    {codigo:7, nombre:'serpiente', patas:0},
    {codigo:8, nombre:'nutria', patas:4},
    {codigo:9, nombre:'mosca', patas:6},
];

let n=animales.length; // Inicializa el contador

// Busca el elemento por su codigo y obtiene una referencia
async function dameCiudades() {
    const filtro=['T','ESP'];
    const [respuesta] = await conexion.query ("SELECT id,Name, District, Population FROM city WHERE LEFT(Name,1)=? AND CountryCode=?;", filtro);
    console.log('dameCiudades() obtiene %d ciudades', respuesta.length);
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

// Añade un nueva ciudad en la base de datos
 async function insertaCiudad(campos) {
    const sentenciaSQL =  "insert into city (Name, CountryCode, District, Population) values (?, ?, ?, ?);";

    let codigoPais= 'ESP';
    if('CountryCode' in campos); //valor por defecto (ESPAÑA)
        codigoPais = campos.CountryCode;
    console.log(sentenciaSQL);
    if ('Name' in campos  && 'District' in campos  && 'Population' in campos) {
        // Crea el objeto incluyendo su código y los datos
        const resultado = await conexion.query (sentenciaSQL,
            [campos.Name, 
            codigoPais,
            campos.District,
            parseInt (campos.Population)]);  
        console.log('Nueva Ciudad:', resultado);
        return true;
    }
    else {
        console.log('Error insertando:',campos);
        return false; 
    }
 }

// Intenta eliminar una ciudad de la lista, buscando el código
async function eliminaCiudad(codigo) {
    // Buscamos el índice del elemento que deseamos borrar
    console.log('Codigo para borrar=',codigo);
    const [resultado] = await conexion.query ("DELETE FROM city WHERE id=?;", [codigo]);

    console.log('Resultado después de borrar=',resultado);
    
    if (codigo != -1) {
        console.log('Encontrado el índice=', resultado);
    
        return true;
    }
    else {
        console.log('Animal no encontrado');
        return false;
    }
}

// Intenta cambiar los datos de un animal
function modificaCiudad(candidato, campos) {
    let cambiado=false;
    // Comprueba si debe cambiar nombre
    if ('nombre' in campos && campos.nombre!=candidato.nombre) {
        candidato.nombre=campos.nombre;
        cambiado=true;
    }
    // Comprueba si debe cambiar patas
    if ('patas' in campos && campos.patas!=candidato.patas) {
        candidato.patas=parseInt(campos.patas); // Convierte a número !!!
        cambiado=true;
    }
    return cambiado;
}

///////////////////////////////////////////////
// Exportar los elementos públicos que va a usar la API
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
    dameCiudad,
    insertaCiudad,
    modificaCiudad,
    eliminaCiudad
}

//module.exports = urbano;
export default urbano;
