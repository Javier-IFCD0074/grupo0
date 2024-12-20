document.getElementById("mostrar").addEventListener("click", mostrarMedicamentos, true);

let contenido = document.querySelector("#contenido");
function mostrarMedicamentos()
{
     
    console.log('Ha pulsado medicamento');
    
    fetch("https://cima.aemps.es/cima/rest/medicamento?nregistro=51347")
        
        .then(res => res.json())
        .then(data =>{
        
            console.log(data);
            
              
            //let medicamento = data.nregistro[0]; // mal
            let medicamento = data;
            console.log(medicamento);
            //let NombreMed = data.nombre[0]; // mal
            let NombreMed = data.nombre;
            console.log(NombreMed);
            let Codigo = data.nregistro;
            console.log(Codigo);
            //let NombreMed = medicamento.nregistro; // ok
            
            contenido.innerHTML = `<br>(Medicamento: ${NombreMed})<br>`;
            contenido.innerHTML += `<br>(Codigo: ${Codigo})<br>`;
            //contenido.innerHTML = ` ${NombreMed.nombre}`;
            //contenido.innerHTML += ` ${Codigo}  ${NombreMed}`;
            //contenido.innerHTML += ' '+Codigo;
            //contenido.innerHTML += ` ${NombreMed}`;
            contenido.innerHTML += `<br>(Laboratorio: ${data.labcomercializador})<br>`;
            //let fotos = data.fotos[0].fotos.url;
            //console.log(url_foto);
            /*let imagen= `<img src="${fotos}" alt="Foto">`;
            contenido.innerHTML += `${imagen}<br>`;
            console.log(imagen);*/
            let foto = data.fotos[0].url;
            console.log(foto);
            let imagen= `<img src="${foto}" alt="Foto">`;
            contenido.innerHTML += `${imagen}<br>`;

            

            


           

    })
       


}
document.getElementById("Limpiar").addEventListener("click", ocultarDatosAPI, true);
function ocultarDatosAPI()
{
    console.log("Ha pulsado borrar medicamento");
    contenido.innerHTML ='';
    
    
}
document.getElementById("texto").addEventListener("click", verMedicamentos, true);
function verMedicamentos() { 
			
    console.log("Ha pulsado en ver medicamentos")

    fetch("https://cima.aemps.es/cima/rest/medicamento?nregistro=60351")
        
    .then(res => res.json())
    .then(data =>{
    
        console.log(data);
        
          
        
        let medicamento = data;
        console.log(medicamento); 
        let NombreMed = data.nombre;
        console.log(NombreMed);
        let Codigo = data.nregistro;
        console.log(Codigo);
       
        
        contenido.innerHTML = `<br>(Medicamento: ${NombreMed})<br>`;
        contenido.innerHTML += `<br>(Codigo: ${Codigo})<br>`;
       
        contenido.innerHTML += `<br>(Laboratorio: ${data.labcomercializador})<br>`;
        
        /*let foto = data.fotos[0].url;
        console.log(foto);
        let imagen= `<img src="${foto}" alt="Foto">`;
        contenido.innerHTML += `${imagen}<br>`;*/
    })

} 
/*document.getElementById("medicina").addEventListener("select", verMedicina, true);
function verMedicina() { 
			
    console.log("Ha pulsado en ver medicamentos")

    fetch("https://cima.aemps.es/cima/publico/home.html")
        
    .then(res => res.json())
    .then(data =>{
    
        console.log(data);
        
          
        
        let medicamento = data;
        console.log(medicamento); 
        let NombreMed = data.nombre;
        console.log(NombreMed);
        let Codigo = data.nregistro;
        console.log(Codigo);
       
        
        contenido.innerHTML = `<br>(Medicamento: ${NombreMed})<br>`;
        contenido.innerHTML += `<br>(Codigo: ${Codigo})<br>`;
       
        contenido.innerHTML += `<br>(Laboratorio: ${data.labcomercializador})<br>`;
        
        let foto = data.fotos[0].url;
        console.log(foto);
        let imagen= `<img src="${foto}" alt="Foto">`;
        contenido.innerHTML += `${imagen}<br>`;*/
   // })

//} 