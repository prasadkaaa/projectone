const express = require('express');
const app = express();
const PORT = 8000;
const fs = require('fs');


//In Memory database:
const books = [
    { id: 1, title: 'Book One', author: 'Author One' },
    { id: 2, title: 'Book Two', author: 'Author Two' },
    { id: 3, title: 'Book THree', author: 'Author three' }
]

//cutsom middleware:
function loggerMiddleWare(req,res,next){
    console.log('I am a middleware A');
    const log = `\n[${Date.now()}] ${req.method} ${req.path}`;
    fs.appendFileSync('logs.txt',log,'utf-8');
    next();
}


function customMiddleWare(req,res,next){
    console.log('I am a  custom middleware ');
    next();
}

//MiddleWare( PLugins)
app.use(express.json());

app.use(loggerMiddleWare);



//second middleware

app.use(function(req,res,next){
    console.log('I am a middleware A');
    const log = `\n[${Date.now()}] ${req.method} ${req.path}`;
    fs.appendFileSync('logs.txt',log,'utf-8');
    next();
})



//Routes
app.get('/books',customMiddleWare, function (req, res) {
    res.json(books);
})

app.get('/books/:id', function (req, res) {
    const ID= parseInt(req.params.id);
    if(isNaN(ID)) return res.status(400).json({error:` id must be type number`});

    const book = books.find(e => e.id == ID) // like select * from books where id is xx

    if(!book){
        return res.status(404).json({error:`Book with id ${ID} does not exist`});
    }
    return  res.json(book);
})  

app.post('/books',(req,res) =>{
     const {title, author} = req.body;
     if(!title || title === '') return  res.status(400).json({error:`title is required`});
     if(!author || author === '') return  res.status(400).json({error:`author is required`});

     const id = (books.length + 1);

     const book ={id,title,author};
     books.push(book);
    return res.status(201).json({message:` Book created successfully ${id}`});
})

app.delete('/books/:id', function (req, res) {
    const ID= parseInt(req.params.id);
    if(isNaN(ID)) return res.status(400).json({error:` id must be type number`});

    const indexToDelete = books.findIndex(e => e.id == ID) // like delete  from books where id is xx

    if(indexToDelete < 0) return res.status(404).json({error:`Book with id ${ID} does not exist`});
    
   books.splice(indexToDelete,1);
   return res.status(200).json({message:` book got deleted`});
}) 



app.listen(PORT, () => console.log(` server is runing on port ${PORT}`));