const http = require('node:http');
const server = http.createServer(function (req, res) {
    console.log(`Incoming request at [${Date.now()}]`);

    switch(req.url){
        case '/':
            res.writeHead(200);
            return res.end(`Home Page`);
        case '/contact-us':
            res.writeHead(200);
            return res.end(`please contact at prasadkambala@gmail.com`);
         case '/about':
            res.writeHead(200);
            return res.end(`I am a software eng`);  
        default:
            res.writeHead(404);
            return res.end(" not found");   
    }

    
});

server.listen(8000, function () {
    console.log(' Http server is up and running on port 8000');
})