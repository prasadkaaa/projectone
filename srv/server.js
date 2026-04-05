const express = require('express');
const app = express();


app.get('/hello', (req, res) => {
    res.send('Hello from CAP CICD DEPLOYED based on PR /push and merge 🚀');
});

const port = process.env.PORT || 4004;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

