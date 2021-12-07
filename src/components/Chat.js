import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    
    this.state = {
      messages: [], // {content: 'some message', self: true}
      typedMessage: '',
      msgEmail:'',
      hideChat:false
    };

    this.socket = io('http://codeial.codingninjas.com:5000');
    //console.log('this.socket',this.socket);
    this.userEmail = props.user.email;
  }

  componentDidMount(){
    
    if (this.userEmail) {
      this.setupConnections();
    }
  }

  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;


    this.socket.on('connect', function () {

      console.log('CONNECTION ESTABLISHED');

      socketConnection.emit('join_room', {
        user_email: this.userEmail,
        chatroom: 'codeial',
      });

      socketConnection.on('user_joined', function (data) {
        console.log('NEW USER JOINED', data);
      });
    });

    this.socket.on('receive_message', function (data) {
      // add message to state
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;

      //console.log('data inside receive msg',data);

      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }
      

      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
        msgEmail: data.user_email
      });
    });
  };

  handleSubmit = () => {
    const { typedMessage } = this.state;

    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'codeial',
      });
    }
  };

  handleHide = () => {
    const val = !this.state.hideChat;
    this.setState((prevState) => {
      return {
        ...prevState,
        hideChat: val,
      };
    });
  };

  render() {
    const { typedMessage, messages , msgEmail, hideChat} = this.state;
    console.log('messages',messages);

    return (

      
      <div className={hideChat ? 'chat-container chat-down' : 'chat-container'}>

        <div className="chat-header">
          Chat
          <img
            src="https://image.flaticon.com/icons/png/512/992/992683.png"
            alt=""
            height={17}
            onClick={this.handleHide}
          />
        </div>

        {!hideChat && (<>

          <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                message.self
                  ? 'chat-bubble self-chat'
                  : 'chat-bubble other-chat'
              }
              
            >
              {message.content}

              <div className="chat-user">
              <small>{message.self ? (this.props.user.email) : (msgEmail) }</small>
              </div> 
            </div>
          ))}

          </div>

          <div className="chat-footer">
          <input
            type="text"
            placeholder="Start Typing.."
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
          </div>

          </>
        )}


        
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Chat);
