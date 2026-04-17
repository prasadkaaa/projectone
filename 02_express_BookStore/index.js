const express = require('express');
const bookRouter = require('../routes/book.route')
const app = express();
const PORT = 8000;

const {loggerMiddleWare} = require('../middleware/logger');



//MiddleWare( PLugins)
app.use(express.json());

//Routes
app.use('/books',bookRouter);  // imported from route module folder







app.listen(PORT, () => console.log(` server is runing on port ${PORT}`));