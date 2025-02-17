const express = require('express');
const miAPI = express();
const PUERTO = 3000;

// Middleware para procesar JSON
miAPI.use(express.json());

// Array de animales
let animales = [
    { codigo: 1, nombre: 'caballo', patas: 4 },
    { codigo: 2, nombre: 'tigre', patas: 4 },
    { codigo: 3, nombre: 'merluza', patas: 0 },
    
];

// GET: Obtener todos los animales
miAPI.get('/datos', (req, res) => {
    console.log('Obteniendo lista de animales');
    res.status(200).json(animales);
});

// GET: Obtener un animal específico
miAPI.get('/datos/:id', (req, res) => {
    const codigo = parseInt(req.params.id);
    const animal = animales.find(a => a.codigo === codigo);
    
    if (!animal) {
        console.log('Animal no encontrado');
        return res.status(404).json({ error: 'Animal no encontrado' });
    }
    
    console.log('Encontrado animal:', animal);
    res.json(animal);
});

// POST: Agregar nuevo animal
miAPI.post('/datos', (req, res) => {
    const { nombre, patas } = req.body;
    if (!nombre || !patas) {
        console.log('Datos incompletos');
        return res.status(400).json({ 
            error: 'Se requieren nombre y número de patas' 
        });
    }
    
    const nuevoAnimal = {
        codigo: animales.length + 1,
        nombre,
        patas: parseInt(patas)
    };
    
    animales.push(nuevoAnimal);
    console.log('Nuevo animal agregado:', nuevoAnimal);
    res.status(201).json(nuevoAnimal);
});

// PUT: Actualizar un animal existente
miAPI.put('/datos/:id', (req, res) => {
    const codigo = parseInt(req.params.id);
    const { nombre, patas } = req.body;
    const index = animales.findIndex(a => a.codigo === codigo);
    
    if (index === -1) {
        console.log('Animal no encontrado para actualizar');
        return res.status(404).json({ error: 'Animal no encontrado' });
    }
    
    if (nombre) animales[index].nombre = nombre;
    if (patas) animales[index].patas = parseInt(patas);
    
    console.log('Animal actualizado:', animales[index]);
    res.json(animales[index]);
});

// DELETE: Eliminar un animal
miAPI.delete('/datos/:id', (req, res) => {
    const codigo = parseInt(req.params.id);
    const index = animales.findIndex(a => a.codigo === codigo);
    
    if (index === -1) {
        console.log('Animal no encontrado para eliminar');
        return res.status(404).json({ error: 'Animal no encontrado' });
    }
    
    const animalEliminado = animales.splice(index, 1)[0];
    console.log('Animal eliminado:', animalEliminado);
    res.status(200).json(animalEliminado);
});

// Manejo de rutas no encontradas
miAPI.use((req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        mensaje: 'Verifica la URL solicitada' 
    });
});

// Iniciar el servidor
miAPI.listen(PUERTO, () => {
    console.log(`Servidor iniciado en puerto ${PUERTO}`);
});