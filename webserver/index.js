/*
 * Bobby Martin & Alex Robbins
 * 2017
 */

const ws = require('ws');
const net = require('net');

const webpageSocket = new ws.Server({
    port: 6968
}, () => {
    console.log('Webpage socket server listening on port 6968');
});

webpageSocket.on('connection', socket => {
    console.log('Webpage client connected!');
    // set up listeners
    socket.on('close', (code, reason) => console.log(`Webpage client disconnected because: ${reason}`));
    socket.on('message', console.log);
});

const arduinoSocketServer = new net.createServer(socket => {
    console.log('Somebody connected!!');
    // set up listeners
    socket.on('close', hadError => console.log(`Disconnected ${hadError ? 'with error' : 'without error'}`));
    socket.on('data', data => socket.write(data));
});
arduinoSocketServer.listen(6969, () => console.log('Arduino socket server listening on port 6969'));