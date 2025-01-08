const http=require('http');
let zoo=[
    {nombre:'Leon', patas:4, tipo: 'mamiefero'},
    {nombre:'Águila real',patas: 2, tipo:'ave'},
    {nombre:'Tiburon',patas: 0, tipo:'pez'},
    {nombre:'Gacela', patas:4, tipo:'ave'},
    {nombre:'Vaca', patas:4, tipo:'mamifero'},
    {nombre:'Caballo', patas:4, tipo:'mamifero'}

];

let cont=0;

http.createServer(function(req,res){
    //res.writeHead(200,{'content type':'text / plain'});
    console.log('llega una solicitud');
    cont++;
res.writeHead(200,{'content-Type':'aplication/json',
      'access-control-allow-origin':'http://localhost:8000',
});
    res.write(JSON.stringify(zoo));
    console.log('Solicitud numero',cont,'-',req.url);
    res.end();
}).listen(3000); 