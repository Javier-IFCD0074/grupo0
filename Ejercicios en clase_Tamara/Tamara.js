

document.getElementById("mostrar").addEventListener("click", mostrarDatosAPI, true);
document.getElementById("limpiar").addEventListener("click", borrarDatosAPI, true);
let caja = document.querySelector("#contenido");

    function mostrarDatosAPI() 
    {   
        console.log('Ha pulsado mostrar usuario');

        fetch("https://randomuser.me/api")
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                let persona = data.results[0].name;
                console.log(persona);
                caja.innerHTML = `${persona.title}`
                caja.innerHTML += ` ${persona.first}`
                caja.innerHTML += ` ${persona.last} (la edad es ${data.results[0].dob.age})<br>`;
                caja.innerHTML += `<br> Telef:  ${data.results[0].cell}`
                
                let url_foto = data.results[0].picture.medium;
                console.log(url_foto);
                let imagen= `<img src="${url_foto}" alt="ejemplo de foto">`;
                caja.innerHTML += `${imagen}<br>`;
                })

        //caja.innerHTML = 'Hola mundo';
    }

    function mostrarCosas() 
    {
        caja.innerHTML = 'Hola ';
        for(i=0; i<4; i++)
        {
            if (i==2)
                caja.innerHTML += ' perros <br>';
            else
                caja.innerHTML += ' amigos <br>';
        }
    }

    function borrarDatosAPI() 
    {
        console.log('Ha pulsado borrar usuario');
        caja.innerHTML = '';
    }