import * as actions from './actions';
import {
  chatCursor
}
from '../state';
import {
  register
}
from '../dispatcher';
if (typeof io !== 'undefined') {
  let socket = io();
}
export const dispatchToken = register(({
  action, data
}) => {

  switch (action) {
    case actions.postMessage:
      chatCursor(chat => {
        return chat
          .update('messages', (messages) => {
            const msg = data;
            return messages.push(msg);
          });
      });
      break;
    case actions.getMessage:
      console.log('in store with getMessage');
      chatCursor(chat => {
        return chat.update('messages', messages => messages.push(data));
      });
      break;

  }

});
