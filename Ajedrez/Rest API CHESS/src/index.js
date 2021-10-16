const express = require('express');
const app = express();

// Settings
const port = 3000;

// Middlewares
app.use(express.json());

// Routes
const chess = require('./routes/chess');

app.use('/', chess);


// Starting the server
app.listen(port, () => {
  console.log(`Express server listening on port http://localhost:${port}`);
});