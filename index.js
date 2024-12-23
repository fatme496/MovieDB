const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
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
    const formattedTime = hours + ":" + minutes;
    res.send("{status:200, message: " + formattedTime + "}");
});

//Step 4 
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

//Step 5

// CREATE
app.get('/movies/create', (req, res) => {
    res.json({ status: 200, message: "This is the create route." });
});

// READ
app.get('/movies/read', (req, res) => {
    res.json({ status: 200, data: movies });
});

// UPDATE
app.get('/movies/update', (req, res) => {
    res.json({ status: 200, message: "This is the update route." });
});

// DELETE
app.get('/movies/delete', (req, res) => {
    res.json({ status: 200, message: "This is the delete route." });
});

//Step 6
// READ BY DATE
app.get('/movies/read/by-date', (req, res) => {
    const sortedByDate = [...movies].sort((a, b) => a.year - b.year); // Sort by year (ascending)
    res.json({ status: 200, data: sortedByDate });
});

// READ BY RATING
app.get('/movies/read/by-rating', (req, res) => {
    const sortedByRating = [...movies].sort((a, b) => b.rating - a.rating); // Sort by rating (descending)
    res.json({ status: 200, data: sortedByRating });
});

// READ BY TITLE
app.get('/movies/read/by-title', (req, res) => {
    const sortedByTitle = [...movies].sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title
    res.json({ status: 200, data: sortedByTitle });
});

//Step 7
app.get('/movies/read/id/:id', (req, res) => {
    const id = parseInt(req.params.id); // Get the ID from the route and convert to a number
    if (id >= 0 && id < movies.length) {
        // Check if the ID is valid (within the array index range)
        res.json({ status: 200, data: movies[id] });
    } else {
        // Return 404 if the ID is invalid
        res.status(404).json({ status: 404, error: true, message: `The movie ${id} does not exist` });
    }
});

//Step 8
app.get('/movies/add', (req, res) => {
    const { title, year, rating } = req.query;

    // Validation
    if (!title || !year || isNaN(year) || year.length !== 4) {
        res.status(403).json({
            status: 403,
            error: true,
            message: 'You cannot create a movie without providing a title and a year'
        });
        return;
    }

    // Use default rating if not provided
    const newRating = rating ? parseFloat(rating) : 4;

    // Add the new movie to the array
    const newMovie = { title, year: parseInt(year), rating: newRating };
    movies.push(newMovie);

    // Respond with the updated list of movies
    res.json({ status: 200, data: movies });
});

//Step 9
app.get('/movies/delete/:id', (req, res) => {
    const id = parseInt(req.params.id); // Get the ID from the URL and convert to a number

    // Validate the ID
    if (id >= 0 && id < movies.length) {
        // Remove the movie at the specified ID
        movies.splice(id, 1);
        res.json({ status: 200, data: movies }); // Return the updated movie list
    } else {
        // Respond with an error if the ID is invalid
        res.status(404).json({
            status: 404,
            error: true,
            message: `The movie ${id} does not exist`
        });
    }
});

//Step 10
app.get('/movies/update/:id', (req, res) => {
    const id = parseInt(req.params.id); // Get the ID from the URL
    const { title, rating, year } = req.query; // Extract query parameters

    // Validate ID
    if (id >= 0 && id < movies.length) {
        // Update movie fields only if provided
        if (title) movies[id].title = title;
        if (rating) movies[id].rating = parseFloat(rating);
        if (year && !isNaN(year) && year.length === 4) movies[id].year = parseInt(year);

        res.json({ status: 200, data: movies }); // Return the updated movie list
    } else {
        res.status(404).json({
            status: 404,
            error: true,
            message: `The movie with ID ${id} does not exist`
        });
    }
});

//Step 11




