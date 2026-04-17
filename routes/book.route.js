const express = require('express');

const  router = express.Router();
const  bookController = require('../controllers/book.controller');


router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/',bookController.createBook);
router.delete('/:id',bookController.deleteBookById);


module.exports = router;