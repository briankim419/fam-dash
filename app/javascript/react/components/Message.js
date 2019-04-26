import React from 'react';
const Message = (props) => {

  return(
    <div className="currentuser-chat-text">
      <strong className="user-name"> {props.currentUser.first_name}: </strong>
      <p className="chat-message">{props.message}</p>
    </div>
  );
};

export default Message;
