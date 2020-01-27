const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
//LEVANTANDO SERVIDOR OLD STYLE NO CON EXPRESS PORQUE SI NO, NO DA EL socketIO
const http = require('http'); // lo trae node por defecto

const app = express();
let server = http.createServer(app);

const port = process.env.PORT || 3000;

const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));

//IO = esta es la comunicacion del backend
//este io le paso a /sockets/socket.js
module.exports.io = socketIO(server);

//utilizando el archivo que contiene los sockets del backend
require('./sockets/socket');


server.listen(port, (err) => {

  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${ port }`);

});