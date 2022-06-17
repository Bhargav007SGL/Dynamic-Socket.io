const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

var message;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/demo', (req, res) => {
  setInterval(()=>
  {
    message = new Date().getTime();
  },1000)
  res.sendFile(__dirname + '/op.html');
});

io.on('connection', (socket) => {
  senddata(socket);
});

function senddata(socket)
{
  socket.emit('demo', message);
  setTimeout(()=>
  {
    senddata(socket);
  },1000)
}

server.listen(3000, () => {
  console.log('listening on *:3000');
});