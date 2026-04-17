const fs = require('fs');

exports.loggerMiddleWare = function loggerMiddleWare(req,res,next){
    console.log('I am a middleware A');
    const log = `\n[${Date.now()}] ${req.method} ${req.path}`;
    fs.appendFileSync('logs.txt',log,'utf-8');
    next();
}