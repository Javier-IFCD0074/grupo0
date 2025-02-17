/* 
  04_dobleAPI.js  - Implementar API usando un framework llamado EXPRESS
      * Información de ciudades y población, conectada a MySQL
      * Catálogo de animales y número de patas, basado en lista de objetos

  Cada API importa código de otro archivo  (ver evolución en Leeme.txt)

  Métodos: GET, POST, PUT, DELETE 

  Glosario:
    API : Application Programming Interface
    JSON: Javascript Object Notation
    CRUD: Create, Read, Update and Delete
    NPM : Node.js package manager
*/

//const express= require('express'); // Framework (instalado con npm)
import express from 'express';
import bodyParser from 'body-parser'; // Necesario para leer el cuerpo de las peticiones
import fauna from './04_animFunc.js'; // Catálogo de animales
import urbano from './04_ciudadDB.js'; // Información de ciudades y población

const miAPI = express(); // Crear el servicio API
const PUERTO = 3000; // Definir puerto de escucha

// Middleware para leer el cuerpo de las peticiones POST y PUT
miAPI.use(bodyParser.json()); // Analiza las solicitudes con contenido JSON

///////////
// RUTAS //
///////////

// Raíz: tratamiento de la ruta principal
miAPI.get('/', (req, res) => {
    console.log('GET en ruta raíz');
    res.send('<h1 style="color:green">¡¡Bienvenido!!</h1>');
});

//////////////////////////////////////
//  S E C C I Ó N   C I U D A D E S // 
//////////////////////////////////////

// Metodo GET: para lectura de ciudades
miAPI.get('/civitas', (req, res) => {
    urbano.dameCiudades()
        .then(ciudades => {
            console.log('Piden lista de ciudades y devuelvo', ciudades.length, 'elementos');
            res.json(ciudades);
        })
        .catch(err => res.status(500).send('Error en la consulta de ciudades: ' + err));
});

// Metodo GET: para lectura de datos por id
miAPI.get('/civitas/:id', async (req, res) => {
    const codigo = req.params.id;
    console.log('Piden ciudad con código', codigo);
    try {
        let candidato = await urbano.dameCiudad(codigo);
        if (candidato) {
            res.status(200).json(candidato);
        } else {
            res.status(404).send('No existe ciudad con código ' + codigo);
        }
    } catch (error) {
        res.status(500).send('Error al obtener la ciudad: ' + error);
    }
});

// Metodo POST: para insertar datos
miAPI.post('/civitas', async (req, res) => {
    const detalles = req.body; // Datos del nuevo elemento enviados en el cuerpo
    try {
        const resultado = await urbano.insertaCiudad(detalles);
        if (resultado) {
            res.status(201).send('Ciudad insertada');
        } else {
            res.status(400).send('Petición incorrecta');
        }
    } catch (err) {
        res.status(500).send('Error al insertar ciudad: ' + err);
    }
});

// Metodo PUT: para modificar datos
miAPI.put('/civitas/:id', async (req, res) => {
    const codigo = req.params.id;
    const detalles = req.body; // Nuevos detalles para modificar
    console.log('Quieren modificar la ciudad con código', codigo);
    try {
        let candidato = await urbano.dameCiudad(codigo);
        if (candidato) {
            const modificado = await urbano.modificaCiudad(codigo, detalles);
            if (modificado) {
                res.status(202).send('Elemento modificado');
            } else {
                res.status(304).send('No hubo cambios');
            }
        } else {
            res.status(404).send('No existe ciudad con código ' + codigo);
        }
    } catch (err) {
        res.status(500).send('Error al modificar ciudad: ' + err);
    }
});

// Metodo DELETE: para eliminar datos
miAPI.delete('/civitas/:id', async (req, res) => {
    const codigo = req.params.id;
    console.log('Quieren borrar la ciudad con código', codigo);
    try {
        const eliminado = await urbano.eliminaCiudad(codigo);
        if (eliminado) {
            res.status(202).send('Elemento eliminado');
        } else {
            res.status(404).send('No existe ciudad con código ' + codigo);
        }
    } catch (err) {
        res.status(500).send('Error al eliminar ciudad: ' + err);
    }
});

//////////////////////////////////////
//  S E C C I Ó N   A N I M A L E S // 
//////////////////////////////////////

// Metodo GET: para lectura de datos de animales
miAPI.get('/datos', (req, res) => {
    console.log('Piden lista de animales y devuelvo', fauna.animales.length, 'elementos');
    res.json(fauna.animales);
});

// Metodo GET: para lectura de datos de un animal por id
miAPI.get('/datos/:id', (req, res) => {
    const codigo = req.params.id;
    console.log('Piden animal con código', codigo);
    const candidato = fauna.dameAnimal(codigo);
    if (candidato) {
        res.status(200).json(candidato);
    } else {
        res.status(404).send('No existe animal con código ' + codigo);
    }
});

// Metodo POST: para insertar datos de animales
miAPI.post('/datos', (req, res) => {
    const detalles = req.body; // Datos del nuevo animal enviados en el cuerpo
    if (fauna.agregaAnimal(detalles)) {
        res.status(201).send('Animal insertado');
    } else {
        res.status(400).send('Petición incorrecta');
    }
});

// Metodo PUT: para modificar datos de animales
miAPI.put('/datos/:id', (req, res) => {
    const codigo = req.params.id;
    const detalles = req.body; // Nuevos detalles para modificar
    console.log('Quieren modificar el animal con código', codigo);
    const candidato = fauna.dameAnimal(codigo);
    if (candidato) {
        if (fauna.modificaAnimal(codigo, detalles)) {
            res.status(202).send('Elemento modificado');
        } else {
            res.status(304).send('No hubo cambios');
        }
    } else {
        res.status(404).send('No existe animal con código ' + codigo);
    }
});

// Metodo DELETE: para eliminar datos de un animal
miAPI.delete('/datos/:id', (req, res) => {
    const codigo = req.params.id;
    console.log('Quieren borrar el animal con código', codigo);
    if (fauna.eliminaAnimal(codigo)) {
        res.status(202).send('Elemento eliminado');
    } else {
        res.status(404).send('No existe animal con código ' + codigo);
    }
});

/////////////////////////////////////////////
// Esta función genera respuesta si no existe la ruta especificada por el cliente
miAPI.use((req, res) => {
    res.status(404).send('<h1 style="color:red">404: no encontrado</h1>');
});

///////////////////////////////////////////
// Establece el puerto de escucha
miAPI.listen(PUERTO, () => {
    console.log(`Escuchando en puerto ${PUERTO}`);
});
