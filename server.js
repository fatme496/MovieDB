//Import Express
const express = require('express');

//Create an instance of an Express app
const app = express();

//Define a port
const PORT = 3000;

//Define a basic route
app.get('/', (req, res) => {
    res.send('ok');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });