import React from 'react';
const Message = (props) => {

  let currentMessage
  let currentUserId = props.currentUser.id

  if(props.messageUserId == props.currentUser.id){
    currentMessage =

      <div className="currentuser-chat-text">
        <strong className="user-name">{props.firstName}: </strong>
          <p className="chat-message">{props.message}</p>
      </div>

  } else {
    currentMessage =
      <div className="chat-text">
        <strong className="user-name">{props.firstName}: </strong>
        <p className="chat-message">{props.message}</p>
      </div>
  }

  return(
    <div> {currentMessage} </div>
  );
};

export default Message;
