const http=require('http');

let tienda=[
    {nombre:'Pera', precio:2, tipo: 'Fruta'},
    {nombre:'Manzana', precio:1.5, tipo: 'Fruta'},
    {nombre:'Salchichas', precio:34.2, tipo: 'Carne'},


];

let cont=0;

http.createServer(function(req,res){
    //res.writeHead(200,{'content type':'text / plain'});
    cont++;
    console.log('llega una solicitud #', cont);
res.writeHead(200,{'content-Type':'aplication/json',
      'access-control-allow-origin':'http://localhost:8000',
});
    res.write(JSON.stringify(tienda));
    console.log('Solicitud numero',cont,'-',req.url);
    res.end();
}).listen(3000); 