function mostrarDatosAPI() {
    console.log("Ha pulsado mostrar usuario");
    
    fetch("https://randomuser.me/api")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            
            // Extract user information
            let name = `${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last}`;
            let age = data.results[0].dob.age;
            let city = data.results[0].location.city;
            let state = data.results[0].location.state;
            let country = data.results[0].location.country;
            // Update content
            contenido.innerHTML = 
            `  <h2>${name}</h2>
                <p>Age: ${age}</p>
                <p>City: ${city}</p>
                <p>State: ${state}</p>
                <p>Country: ${country}</p>`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            contenido.innerHTML = 'Failed to retrieve user data.';
        });
}
document
.getElementById("mostrar")
.addEventListener("click", mostrarDatosAPI, true);
document
.getElementById("borrar")
.addEventListener("click", borrarusuario, true);

let contenido = document.querySelector("#contenido");

function mostrarDatosAPI() {
console.log("Ha pulsado mostrar usuario");
fetch("https://randomuser.me/api")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    contenido.innerHTML = `${data.results[0].name.title}`;
    contenido.innerHTML += ` ${data.results[0].name.first}`;
    contenido.innerHTML += ` ${data.results[0].name.last} <br> `;
    contenido.innerHTML += `${data.results[0].name.age}`;

    let url_foto = data.results[0].picture.medium;
    console.log(url_foto);
    let imagen = `<img src="${url_foto}"  alt="foto de Johnny Depp" title="J.Depp">`;

    contenido.innerHTML += `${imagen}<br>`;
    
   
  });
}
function getRandomAge(minAge = 18, maxAge = 100) {
    console.log(`Random age between ${minAge} and ${maxAge}`);

    // Fetch the actual age from the API
    fetch("https://randomuser.me/api")
        .then((res) => res.json())
        .then((data) => {
            // Get the age from the previous fetch
            let fetchedAge = data.results[0].dob.age;
            
            // Generate a random age between minAge and maxAge
            let randomAge = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
            
            console.log(`Fetched age: ${fetchedAge}, Random age: ${randomAge}`);
            
            return randomAge;
        });
}


function mostrarCosas() {
contenido.innerHTML = "Hola";
for (i = 0; i < 7; i++) {
  if (i == 2) contenido.innerHTML += "perros <br>";
  else contenido.innerHTML += "colegas <br>";
}
}

function borrarusuario() {
console.log("Ha pulsado borrar usuario");
contenido.innerHTML = "";
} 