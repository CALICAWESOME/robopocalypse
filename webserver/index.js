/*
 * Bobby Martin & Alex Robbins
 * 2017
 */

const ws = require('ws');
const net = require('net');

const dummySocket = {
    write: message => console.log(`can't write "${message}", there's no socket!!!!!`)
};

let arduinoSocket = dummySocket;

const webpageSocketServer = new ws.Server({
    port: 6968
}, () => {
    console.log('Webpage socket server listening on port 6968');
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

const arduinoSocketServer = new net.createServer(socket => {
    console.log('Somebody connected!!');
    // set up listeners
    socket.on('close', hadError => {
        console.log(`Disconnected ${hadError ? 'with error' : 'without error'}`);
        arduinoSocket = dummySocket;
    });
    socket.write('HELLO SON');
    arduinoSocket = socket;
});
arduinoSocketServer.listen(6969, () => console.log('Arduino socket server listening on port 6969'));