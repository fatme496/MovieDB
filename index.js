//Import Express
const express = require('express');

//Create an instance of an Express app
const app = express();

//Define a port
const PORT = 3000;

//Define a basic route
app.get('/', (req, res) => {
    res.send("ok");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

//Adding /test page
app.get('/test', (req, res) => {
    res.send('{status:200, message:"ok"}');
});


//Adding /time page
app.get('/time', (req, res) => {
    //Setting Current Time
const currentTime = new Date();
const hours = currentTime.getHours();
const minutes = currentTime.getMinutes();

//Time Format 
const formattedTime = hours+":"+minutes;
    res.send("{status:200, message: "+ formattedTime + "}");
});

//step 4 
app.get('/hello/:id?', (req, res) => {
    const id = req.params.id; // Get the `id`
    res.json({ status: 200, message: `Hello, ${id}` }); // Send the JSON response
});

app.get('/search', (req, res) => {
    const search = req.query.s; // Extract the `s` query parameter
    if (search) {
      res.json({ status: 200, message: 'ok', data: search }); // Success response
    } else {
      res.status(500).json({ error: true, message: 'you have to provide a search' }); // Error response
    }
  });
  
  