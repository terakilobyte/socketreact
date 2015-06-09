import config from './config';
import express from 'express';
import {
  Server
}
from 'http';

const app = express();
const server = Server(app);
const io = require('socket.io')(server)

// TODO: Add API sub-app to demonstrate other use cases
// app.use('/api/v1', require('./api'));

// Load react-js frontend.
app.use(require('./frontend'));

// Add error handler. Four arguments need to be defined in order for the
// middleware to act as an error handler.
app.use((err, req, res, next) => {
  const msg = err.stack || err;
  console.log('Yay', msg);
  res.status(500).send('500: ' + msg);
});

io.on('connection', socket => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('got a message! ', msg);
    socket.broadcast.emit('chat message', msg);
  });
});

server.listen(config.port, () => {
  console.log('Server started at port %s', config.port);
});
