// Importa mysql2/promise
import mysql from 'mysql2/promise';

// Configura la conexión a la base de datos
const repositorio = {
    host: 'localhost',
    user: 'burro',
    password: 'itet2024',
    database: 'world'
};

// Crear la conexión a la base de datos
const conexion = await mysql.createConnection(repositorio);

// Datos de ejemplo de animales (no los utilizaremos aquí, pero puedes dejarlos para pruebas)
let animales = [
    {codigo: 1, nombre: 'caballo', patas: 4},
    {codigo: 2, nombre: 'tigre', patas: 4},
    {codigo: 3, nombre: 'merluza', patas: 0},
    {codigo: 4, nombre: 'gallina', patas: 2},
    {codigo: 5, nombre: 'gorrión', patas: 3}, // Error en patas (para modificar)
    {codigo: 6, nombre: 'SPIDER', patas: 8},  // Nombre inadecuado (para modificar)
    {codigo: 7, nombre: 'serpiente', patas: 0},
    {codigo: 8, nombre: 'nutria', patas: 4},
    {codigo: 9, nombre: 'mosca', patas: 6},
];

let n = animales.length; // Inicializa el contador

///////////////////////////////////////////////
// Funciones de consulta y manipulación de datos

// Busca ciudades por ciertos parámetros
async function dameCiudades() {
    const filtro = ['H', 'ESP'];
    const respuesta = await conexion.query("SELECT id, Name, District, Population FROM city WHERE LEFT(Name, 1) = ? AND CountryCode = ?;", filtro);
    console.log('dameCiudades() obtiene %d ciudades', respuesta[0].length);
    return respuesta[0];
}

// Busca una ciudad por su código
async function dameCiudad(codigo) {
    const [captura] = await conexion.query("SELECT id, Name, District, Population FROM city WHERE id = ?;", [codigo]);
    if (captura.length !== 0)
        console.log('Ciudad encontrada:', captura);
    else
        console.log('Ciudad no encontrada');
    return captura;
}

// Inserta una nueva ciudad en la base de datos
async function insertaCiudad(campos) {
    if ('Name' in campos && 'District' in campos && 'Population' in campos) {
        const setenciaSQL = "INSERT INTO city (Name, CountryCode, District, Population) VALUES (?, ?, ?, ?)";
        let codigoPais = 'ESP'; // Valor por defecto
        if ('CountryCode' in campos) 
            codigoPais = campos.CountryCode;

        console.log(setenciaSQL); // Muestra la sentencia SQL para verificar

        // Ejecuta la consulta de inserción
        try {
            const [resultado] = await conexion.query(setenciaSQL,
                [campos.Name, codigoPais, campos.District, parseInt(campos.Population)]);
            console.log('Resultado de la inserción:', resultado);
            return resultado; // Devuelve el resultado de la inserción
        } catch (error) {
            console.error('Error al insertar ciudad:', error);
            return false; // Devuelve false si hubo un error
        }
    } else {
        console.log('Faltan campos para insertar ciudad:', campos);
        return false; // Devuelve false si faltan campos necesarios
    }
}

// Elimina una ciudad según su código (se puede usar para pruebas)
function eliminaCiudad(codigo) {
    // Buscamos el índice del elemento que deseamos borrar
    let indice = animales.findIndex(item => item.codigo == codigo);
    if (indice != -1) {
        console.log('Encontrado el índice=', indice);
        animales.splice(indice, 1); // En esa posición elimina un solo elemento
        return true;
    } else {
        console.log('Ciudad no encontrada');
        return false;
    }
}

// Modifica los datos de una ciudad
function modificaCiudad(candidato, campos) {
    let cambiado = false;
    // Comprueba si debe cambiar el nombre
    if ('nombre' in campos && campos.nombre != candidato.nombre) {
        candidato.nombre = campos.nombre;
        cambiado = true;
    }
    // Comprueba si debe cambiar el número de patas
    if ('patas' in campos && campos.patas != candidato.patas) {
        candidato.patas = parseInt(campos.patas); // Convierte a número
        cambiado = true;
    }
    return cambiado;
}

///////////////////////////////////////////////
// Exportar los elementos públicos que va a usar la API
const urbano = {
    dameCiudades,
    dameCiudad,
    insertaCiudad,
    modificaCiudad,
    eliminaCiudad
}

export default urbano;
