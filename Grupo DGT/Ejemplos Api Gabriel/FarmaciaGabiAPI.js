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
            let Codigo = data.nregistro;
            console.log(Codigo);
            //let NombreMed = medicamento.nregistro; // ok
            console.log(NombreMed);
            
            
            contenido.innerHTML += `<br>(Medicamento: ${NombreMed})<br>`;
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
            

            

            


           

    })
       


}
document.getElementById("Limpiar").addEventListener("click", ocultarDatosAPI, true);
function ocultarDatosAPI()
{
    console.log("Ha pulsado borrar medicamento");
    contenido.innerHTML ='';
    
    
}