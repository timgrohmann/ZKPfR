"use strict";
exports.__esModule = true;
var express = require("express");
var Socket = require("socket.io");
var app = express();
var http = require('http').createServer(app);
var io = Socket(http);
var sockets = [];
io.on('connection', function (socket) {
    console.log(socket.id);
    sockets.forEach(function (s) {
        s.emit('newUser', socket.id);
    });
    sockets.push(socket);
    socket.on('sendMsg', function (text) {
        sockets.forEach(function (s) {
            if (s.id != socket.id) {
                s.emit("stcMsg", text);
            }
        });
        console.log(text);
    });
});
http.listen(3000, function () {
    console.log('listening on *:3000');
});
