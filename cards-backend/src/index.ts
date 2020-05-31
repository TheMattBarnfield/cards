import express from 'express'
import * as http from 'http'
import socketio from 'socket.io'

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(8000, () => {
  console.log('listening on *:8000');
});

const pulse = () => {
  io.emit('pulse')
  setTimeout(pulse, 1000)
}

pulse()