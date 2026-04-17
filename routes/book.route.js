const express = require('express');

const  router = express.Router();
const {BOOKS} =  require('../db/books');

router.get('/', function (req, res) {
    res.json(BOOKS);
})


router.get('/:id', function (req, res) {
    const ID= parseInt(req.params.id);
    if(isNaN(ID)) return res.status(400).json({error:` id must be type number`});

    const book = BOOKS.find(e => e.id == ID) // like select * from books where id is xx

    if(!book){
        return res.status(404).json({error:`Book with id ${ID} does not exist`});
    }
    return  res.json(book);
})  


router.post('/',function(req,res) {
     const {title, author} = req.body;
     if(!title || title === '') return  res.status(400).json({error:`title is required`});
     if(!author || author === '') return  res.status(400).json({error:`author is required`});

     const id = (BOOKS.length + 1);

     const book ={id,title,author};
     BOOKS.push(book);
    return res.status(201).json({message:` Book created successfully ${id}`});
})

router.delete('/:id', function (req, res) {
    const ID= parseInt(req.params.id);
    if(isNaN(ID)) return res.status(400).json({error:` id must be type number`});

    const indexToDelete = BOOKS.findIndex(e => e.id == ID) // like delete  from books where id is xx

    if(indexToDelete < 0) return res.status(404).json({error:`Book with id ${ID} does not exist`});
    
   BOOKS.splice(indexToDelete,1);
   return res.status(200).json({message:` book got deleted`});
}) 


module.exports = router;