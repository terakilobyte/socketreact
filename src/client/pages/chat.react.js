import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';
import {FormattedHTMLMessage} from 'react-intl';
import {msg} from '../intl/store';
import immutable from 'immutable';
import * as actions from '../chat/actions';

export default class Chat extends Component {

  handleSubmit() {
    const msg = React.findDOMNode(this.refs.inputBox).value;
    console.log(msg);
    actions.postMessage(msg);
    React.findDOMNode(this.refs.inputBox).value = '';
  }

  handleKeyPress(e) {
    console.log(e)
    console.log(e.keyCode);
    if (e.which === 13) {
      this.handleSubmit();
    }
  }


  render() {
    const messages = this.props.chat.get('messages');
    console.log('messages: ', this.props.chat.get('messages'));
    let displayedMessages = messages.map((message, index) => {
      return (
        <p key={index}>{message}</p>
      );
    });

    return (
      <DocumentTitle title={msg('chat.title')}>
        <div className="chat-page">
          <p>
            <FormattedHTMLMessage message={msg('chat.infoHtml')} />
          </p>
          <div className="chat-box">
            {displayedMessages}
          </div>
          <input type="text"
            onKeyPress={this.handleKeyPress.bind(this)}
            ref="inputBox"/>
          <input type="submit"
            onClick={this.handleSubmit.bind(this)} />
        </div>
      </DocumentTitle>
    );
  }
}
