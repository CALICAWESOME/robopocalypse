/*
 * Bobby Martin & Alex Robbins
 * 2017
 */

const http = require('http');
const socketio = require('socket.io');

const server = http.createServer();
const io = socketio(server);

io.on('connection', socket => {
    // set up listeners
    socket.on('disconnect', reason => {
        console.log(`Client disconnected because: ${reason}`);
    });

    socket.on('message', console.log);
});

server.listen(6969, () => {
    console.log('Server listening on port 6969');
});