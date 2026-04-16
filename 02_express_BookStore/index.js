const express = require('express');
const app = express();
const PORT = 8000;


//In Memory database:
const books = [
    { id: 1, title: 'Book One', author: 'Author One' },
    { id: 2, title: 'Book Two', author: 'Author Two' },
    { id: 3, title: 'Book THree', author: 'Author three' }
]

//MiddleWare( PLugins)
app.use(express.json());

//Routes
app.get('/books', function (req, res) {
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