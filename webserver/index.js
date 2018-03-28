/*
 * Bobby Martin & Alex Robbins
 * 2018
 */

// load modules
const ws = require('ws');
const net = require('net');

// initialize arduinoSocket to dummy (for now!)
const dummySocket = {
    write: message => console.log(`Can't write "${message}", there's no socket!`)
};
let arduinoSocket = dummySocket;

// create webpage socket server
const webpageSocketServer = new ws.Server({
    port: 6767
}, () => {
    console.log('Webpage socket server listening on port 6767');
});
webpageSocketServer.on('connection', socket => {
    console.log('Webpage client connected!');
    // set up listeners
    socket.on('close', (code, reason) => console.log(`Webpage client disconnected because: ${reason}`));
    socket.on('message', message => {
        console.log(message);
        arduinoSocket.write(message + '\n');
    });
});

// create arduino socket server
const arduinoSocketServer = new net.createServer(socket => {
    console.log('Somebody connected!');
    // set up listeners
    socket.on('close', hadError => {
        console.log(`Disconnected ${hadError ? 'with error' : 'without error'}`);
        arduinoSocket = dummySocket;
    });
    socket.write('Hello!');
    arduinoSocket = socket;
});
arduinoSocketServer.listen(6868, () => console.log('Arduino socket server listening on port 6868'));