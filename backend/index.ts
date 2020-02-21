import * as express from 'express';
import * as Socket from 'socket.io';

const app = express();

const http = require('http').createServer(app);
const io = Socket(http);

let sockets = []

io.on('connection', (socket) => {
    console.log(socket.id)
    sockets.forEach((s) => {
        s.emit('newUser', socket.id)
    })
    sockets.push(socket)
    socket.on('sendMsg', (text) => {
        sockets.forEach((s) => {
            if (s.id != socket.id) {
                s.emit("stcMsg", text)
            }
        })
        console.log(text)
    })
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});