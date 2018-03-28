// Socket stuff first
const server = 'bobby-mart.in';
const socket = new WebSocket(`ws://${server}:6968`);

socket.onopen = () => {
    console.log(`Connected to ${server}!`);
};

socket.onmessage = message => {
    console.log(message.data);
};

// WHEN DA PAGE LOAD
window.onload = function() {
    console.log('Page finished loading');
    document.getElementById('slideboi').oninput = function() {
        socket.send(this.value);
    };
};