import React, { Component } from 'react';
import Message from '../components/Message';
import TextFieldWithSubmit from '../components/TextFieldWithSubmit';
import PastMessagesTile from '../components/PastMessagesTile';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      messages: [],
      message: '',
      pastMessages: []
    }

    this.handleMessageReceipt = this.handleMessageReceipt.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.getPastMessages = this.getPastMessages.bind(this);
    this.updateScroll = this.updateScroll.bind(this);
  }

  componentDidMount() {
    let chatId = this.props.id
    this.getPastMessages()
    fetch(`/api/v1/families/${chatId}/chats`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      let { ok } = response;
      if (ok) {
        return response.json();
      }
    })
    .then((data) => {
      this.setState({user: data})
    })
    App.chatChannel = App.cable.subscriptions.create(
      // Info that is sent to the subscribed method
      {
        channel: "ChatChannel",
        chat_id: this.props.id
      },
      {
        connected: () => console.log("ChatChannel connected"),
        disconnected: () => console.log("ChatChannel disconnected"),
        received: data => {
          // Data broadcasted from the chat channel
          this.handleMessageReceipt(data)
        }
      }
    );
  }

  handleMessageReceipt(message) {
    this.setState({ messages: this.state.messages.concat(message) })
  }

  handleClearForm() {
    this.setState({ message: '' })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let prepMessage = this.state.message
    let user_info = this.state.user

    // Send info to the receive method on the back end
    if(prepMessage.trim() != ''){
      App.chatChannel.send({
       message: prepMessage,
       user: user_info
      })

      this.handleClearForm();
      this.updateScroll();
    }
  }

  handleMessageChange(event) {
    this.setState({ message: event.target.value })
  }

  getPastMessages() {
    let chatId = this.props.id
    fetch(`/api/v1/messages/${chatId}`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      this.setState({pastMessages: data.messages})
      this.setState({messages: []})
    })
  }
  updateScroll(){
    if(document.getElementsByClassName("chat-container")){
      var element = document.getElementsByClassName("chat-container");
      element[0].scrollTop = element[0].scrollHeight;
    }
  }

  render() {
    setTimeout(this.updateScroll, 0);
    let messages = this.state.messages.map(message => { 
      return(
        <Message
          key={message.messageId}
          message={message.message}
          firstName={message.user.first_name}
          currentUser={this.state.user}
          messageUserId={message.user.id}
        />
      )
    }, this);

    return(
      <div className="chat-container">
        <PastMessagesTile
          getPastMessages={this.getPastMessages}
          pastMessages={this.state.pastMessages}
          currentUser={this.state.user}
        />
        {messages}
        <form className="chat-submit" onSubmit={this.handleFormSubmit}>
          <TextFieldWithSubmit
            content={this.state.message}
            name='message'
            handlerFunction={this.handleMessageChange}
          />
        </form>
      </div>
    );
  }
}

export default ChatContainer;
