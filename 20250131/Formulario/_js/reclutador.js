
// ARRAY CON EL CONTENIDO DE LOS NOMBRES DE LOS ALUMNOS
const ALUMNOS = [
    "Iván",
    "Naiara",
    "Raúl",
    "Christian",
    "Daniel",
    "Gabriel",
    "Jonathan",
    "Eduardo",
    "David",
    "Tamara",
    "Roberto",
    "Ander"
];

// ARRAY PARA CONTROLAR QUE NO HAYA MÁS DE TRES REGISTROS.
let buffer = [];

function iniciarDios() {

    // DEVUELVE LA CANTIDAD DE ALUMNOS - 1.
    let numAlumnos = 
    ALUMNOS.length -1;

    // DEVUELVE UN VALOR DE 0 a numAlumnos
    let numAleatorio = 
    parseInt(
        Math.random() * numAlumnos
    );

    if(buffer
        .length == 3) {

        buffer=[];
    }

    // SI EL NÚMERO ALEATORIO ESTÁ DENTRO DEL BUFFER,
    // PEDIMOS OTRO NÚMERO.
    while(
    buffer
    .includes(numAleatorio)) {

        numAleatorio = 
        parseInt(
            Math.random() * numAlumnos
        );
    }

    // AÑADIMOS EL NUEVO NÚMERO AL BUFFER:
    buffer
    .push(
        numAleatorio
    );

    // INSERTA EN LA ETIQUETA CON ID "seleccionado" EL NOMBRE
    // DEL ALUMNO.
    document
    .getElementById(
        "seleccionado"
    ).innerHTML = 
    ALUMNOS[numAleatorio];
}

document
.getElementById(
    "btnSacrificio")
.addEventListener("click", () => {

    iniciarDios();
});