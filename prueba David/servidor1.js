const http=require('http');

http.createServer(function(req,res){
    res.write('Hola mundo'),
    res.end();
}).listen(3000);