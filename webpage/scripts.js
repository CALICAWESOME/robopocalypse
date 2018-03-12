// Socket stuff first
const socket = io('http://localhost:6969');

socket.on('connect', () => {
    console.log('WE OUT HERE');
});

// WHEN DA PAGE LOAD
window.onload = function() {
    console.log("HEY IT LOADED FUCKER");
    document.getElementById("slideboi").oninput = function() {
        socket.send(this.value);
    };
};