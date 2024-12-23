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

//Setting Current Time
const currentTime = new Date();
const hours = currentTime.getHours();
const minutes = currentTime.getMinutes();

//Time Format 
const formattedTime = hours+":"+minutes;
console.log(formattedTime);

//Adding /time page
app.get('/time', (req, res) => {
    res.send("{status:200, message: "+ formattedTime + "}");
});