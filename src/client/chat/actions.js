import {
  dispatch
}
from '../dispatcher';
import setToString from '../../lib/settostring';

if (typeof io !== 'undefined') {
  var socket = io();
  socket.on('chat message', (msg) => {
    console.log('got a message: %s', msg);
    getMessage(msg);
  });
}

export function postMessage(msg) {
  socket.emit('chat message', msg);
  dispatch(postMessage, msg);
}

export function getMessage(msg) {
  dispatch(getMessage, msg);
}

setToString('chat', {
  postMessage,
  getMessage
});
