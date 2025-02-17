//const express= require('express'); // Framework (instalado con npm)
import express from 'express'; // Framework (instalado con npm)

const miAPI = express(); // Crear el servicio API es sencillo
const PUERTO = 3000; // Para mayor claridad, se define el puerto de escucha

import anim from './04_animFunc.js';
import urbano from './04_ciudadDB.js';

// Usar middleware para analizar el cuerpo de la solicitud en formato JSON
miAPI.use(express.json());

///////////
// RUTAS //
///////////

// Raíz: tratamiento de la ruta principal
miAPI.get('/', (req, res) => {
    console.log('GET en ruta raiz');
    res.send('<h1 style="color:green">¡¡Bienvenido!!</h1>');
});

//////////////////////////////////////
//  S E C C I Ó N   C I U D A D E S // 
//////////////////////////////////////

// Metodo GET: para lectura de ciudades
miAPI.get('/civitas', (req, res) => urbano.dameCiudades()
    .then(ciudades => {
        console.log('Piden lista de ciudades y devuelvo', ciudades.length, 'elementos');
        res.json(ciudades);
    }
    ));

// Metodo GET: para lectura de datos
miAPI.get('/civitas/:id', async (req, res) => {
    const codigo = req.params.id;
    console.log('Piden ciudad con código', codigo);
    // Buscamos el elemento por su codigo y obtenemos una referencia
    let candidato = await urbano.dameCiudad(codigo);
    if (candidato)
        res.status(302).json(candidato);
    else
        res.status(404).send('No existe ciudad con código ' + codigo);
});

// Metodo POST: para insertar datos
miAPI.post('/civitas', (req, res) => {
    let detalles = req.body; // Usar req.body para obtener los datos del cuerpo

    // Insertar los datos
    urbano.insertaCiudad(detalles)
        .then(resultado => {
            console.log('Insertado', resultado);
            res.status(201).send('Insertado');
        })
        .catch(err => {
            console.log('Error insertando:', err);
            res.status(400).send('Petición incorrecta');
        });
});

// Metodo PUT: para modificar datos
miAPI.put('/civitas/:id', (req, res) => {
    const codigo = req.params.id;
    const detalles = req.body; // Lo que se quiere cambiar
    console.log('Quieren modificar la ciudad con código', codigo);
    urbano.dameCiudad(codigo)
        .then(candidato => {
            if (candidato) {
                if (urbano.modificaCiudad(candidato, detalles))
                    res.status(202).send('Elemento modificado');
                else
                    res.status(304).send('No hubo cambios');
            } else {
                res.status(404).send('No existe ciudad con código ' + codigo);
            }
        });
});

// Metodo DELETE: para eliminar datos
miAPI.delete('/civitas/:id', (req, res) => {
    const codigo = req.params.id;
    console.log('Quieren borrar la ciudad con código', codigo);
    urbano.eliminaCiudad(codigo)
        .then(result => {
            if (result)
                res.status(202).send('Elemento eliminado');
            else
                res.status(404).send('No existe ciudad con código ' + codigo);
        })
        .catch(err => {
            console.log('Error al eliminar ciudad:', err);
            res.status(500).send('Error interno del servidor');
        });
});

//////////////////////////////////////
//  S E C C I Ó N   A N I M A L E S // 
//////////////////////////////////////

// Metodo GET: para lectura de datos
miAPI.get('/datos', (req, res) => {
    console.log('Piden lista de animales y devuelvo', anim.animales.length, 'elementos');
    res.json(anim.animales);
});

// Metodo GET: para lectura de datos
miAPI.get('/datos/:id', (req, res) => {
    const codigo = req.params.id;
    console.log('Piden animal con código', codigo);
    // Buscamos el elemento por su codigo y obtenemos una referencia
    let candidato = anim.animales.find(animal => animal.codigo == codigo);
    if (candidato)
        res.status(302).json(candidato);
    else
        res.status(404).send('No existe animal con código ' + codigo);
});

// Metodo POST: para insertar datos
miAPI.post('/datos', (req, res) => {
    let detalles = req.body; // Usar req.body para obtener los datos del cuerpo

    if (anim.agregaAnimal(detalles))
        res.status(201).send('Insertado');
    else
        res.status(400).send('Petición incorrecta');
});

// Metodo PUT: para modificar datos
miAPI.put('/datos/:id', (req, res) => {
    const codigo = req.params.id;
    const detalles = req.body; // Lo que se quiere cambiar
    console.log('Quieren modificar el animal con código', codigo);
    let candidato = anim.animales.find(animal => animal.codigo == codigo);
    if (candidato) {
        if (anim.modificaAnimal(candidato, detalles))
            res.status(202).send('Elemento modificado');
        else
            res.status(304).send('No hubo cambios');
    } else {
        res.status(404).send('No existe animal con código ' + codigo);
    }
});

// Metodo DELETE: para eliminar datos
miAPI.delete('/datos/:id', (req, res) => {
    const codigo = req.params.id;
    console.log('Quieren borrar el animal con código', codigo);
    if (anim.eliminaAnimal(codigo))
        res.status(202).send('Elemento eliminado');
    else
        res.status(404).send('No existe animal con código ' + codigo);
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
