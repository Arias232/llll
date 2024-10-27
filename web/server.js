const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Sirve los archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Un usuario se conectó');

    // Escucha mensajes del cliente
    socket.on('mensaje', (msg) => {
        // Reenviar el mensaje a todos los clientes conectados
        io.emit('mensaje', msg);
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se desconectó');
    });
});

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
