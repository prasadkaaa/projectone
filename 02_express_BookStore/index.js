const express = require('express');
const app = express();
const PORT = 8000;

const {loggerMiddleWare} = require('../middleware/logger');
const bookRouter = require('../routes/book.route')



//MiddleWare( PLugins)
app.use(express.json());
app.use(loggerMiddleWare);

//Routes
app.use('/books',bookRouter);  // imported from route module folder

app.listen(PORT, () => console.log(` server is runing on port ${PORT}`));