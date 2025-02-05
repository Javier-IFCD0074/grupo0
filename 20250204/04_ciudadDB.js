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
    host: '10.57.22.106',
    user: 'burro',
    password: 'itet2024',
    database: 'world'
}

const conexion = await mysql.createConnection(repositorio);
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
    const filtro=['H','DEU'];
    const [respuesta] = await conexion.query ("SELECT id,Name, District, Population FROM city WHERE LEFT(Name,1)=? AND CountryCode=?;", filtro);
    console.log('dameCiudades() obtiene %d ciudades', respuesta.length);
    return resp;
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

// Añade un nuevo animal en la lista
function insertaCiudad(campos) {
    if ('nombre' in campos && 'patas' in campos) {
        n++; // Incrementa el contador
        // Crea el objeto incluyendo su código y los datos
        let nuevo={codigo:n, 
            nombre:campos.nombre, 
            patas:parseInt(campos.patas)};  // Convierte a número !!!
        animales.push(nuevo); // Agregar al final de la lista
        console.log('Nuevo animal:', nuevo);
        return true;
    }
    else {
        console.log('Error insertando:',campos);
        return false;
    }
}

// Intenta eliminar una ciudad de la lista, buscando el código
function eliminaCiudad(codigo) {
    // Buscamos el índice del elemento que deseamos borrar
    let indice=animales.findIndex(item => item.codigo==codigo);
    if (indice != -1) {
        console.log('Encontrado el índice=', indice);
        animales.splice(indice, 1); // En esa posicion elimina un solo elemento
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
