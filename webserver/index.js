/*
 * Bobby Martin & Alex Robbins
 * 2017
 */

const ws = require('ws');

const webpageSocket = new ws.Server({
    port: 6968
}, () => {
    console.log('Webpage socket server listening on port 6968');
});
const arduinoSocket = new ws.Server({
    port: 6969
}, () => {
    console.log('Arduino socket server listenin on port 6969')
});

webpageSocket.on('connection', socket => {
    // set up listeners
    socket.on('close', (code, reason) => {
        console.log(`Webpage client disconnected because: ${reason}`);
    });

    console.log('Webpage client connected!');
    socket.on('message', console.log);
});

arduinoSocket.on('connection', socket => {
    // set up listeners
    socket.on('close', (code, reason) => {
        console.log(`Arduino client disconnected because: ${reason}`);
    });

    console.log('Arduino client connected!');
    socket.send('HELLO MY SON');
});