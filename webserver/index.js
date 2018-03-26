/*
 * Bobby Martin & Alex Robbins
 * 2017
 */

const http = require('http');
const socketio = require('socket.io');

const server = http.createServer();
const io = socketio(server);

// separate namespaces for webpage & arduino
const webpageSocket = io.of('/webpage');
const arduinoSocket = io.of('/arduino');

webpageSocket.on('connection', socket => {
    // set up listeners
    socket.on('disconnect', reason => {
        console.log(`Client disconnected because: ${reason}`);
    });

    console.log('Client connected!');
    socket.on('message', console.log);

    // io.emit('message', 'io');
    // webpageSocket.emit('message', 'webpageSocket');
    // arduinoSocket.emit('message', 'arduinoSocket');
});

server.listen(6969, () => {
    console.log('Server listening on port 6969');
});