const express = require('express')
const app = express();
const cors = require('cors')

const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Middlewares
app.use(express.json());
app.use(cors());

// Directorio public
app.use('/', express.static('public'));


// Routes
const addPieces = require('./routes/addPositionPieces');
const getPieces = require('./routes/getPositionPieces');
const updatePieces = require('./routes/updatePositionPieces');


app.use('/', addPieces);
app.use('/', getPieces);
app.use('/', updatePieces);


io.on('connection', (socket) => {
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    })

    socket.on('enviar-pospiezas', (payload, callback ) => {

        //Enviar mensaje a todos los clientes conectados
        socket.broadcast.emit('enviar-pospiezas', payload);
    })
})


module.exports = server;