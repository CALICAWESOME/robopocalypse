// Socket stuff first
const server = 'localhost';
const socket = io(`http://${server}:6969/webpage`);

socket.on('connect', () => {
    console.log(`Connected to ${server}!`);
});

socket.on('message', message => {
    console.log(message);
});

// WHEN DA PAGE LOAD
window.onload = function() {
    console.log('Page finished loading');
    document.getElementById('slideboi').oninput = function() {
        socket.send(this.value);
    };
};