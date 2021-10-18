const express = require('express')
const app = express();

// Settings
const port = 10101;

// Middlewares
app.use(express.json());

// Routes
const chess = require('./routes/RestAPIchess');
app.use('/chess', chess);

// Directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));


app.get('/', (req, res)=>{
  res.sendFile('chess.html', {root : __dirname + '/view'});
})

// Starting the server
app.listen(port, () => {
  console.log(`Express server listening on port http://localhost:${port}`);
});