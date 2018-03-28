/*
 * Bobby Martin & Alex Robbins
 * 2018
 */

// first, initialize socket
const server = 'bobby-mart.in';
const socket = new WebSocket(`ws://${server}:6767`);

// set up listeners
socket.onopen = () => {
    console.log(`Connected to ${server}!`);
};
socket.onmessage = message => {
    console.log(message.data);
};

// when the page loads, connect slider to socket
window.onload = function() {
    console.log('Page finished loading');
    document.getElementById('slidebar').oninput = function() {
        socket.send(this.value);
    };
};