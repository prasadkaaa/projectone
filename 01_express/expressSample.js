const express = require ('express');
const app = express();

app.get('/',function(rer,res){
    res.end('HomePage');
})

app.get('/contact-us',function(rer,res){
    res.end('You can contact me at my email address');
}) 

app.get('/tweets',function(rer,res){
    res.end('Here are your tweets');
}) 


app.post('/tweets',function(rer,res){
    res.status(201).end('Tweet created successfully');
})

app.listen(8000,()=> console.log(` server is runing on port 8000`));