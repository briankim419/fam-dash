import React from 'react';
const Message = (props) => {

  return(
    <p className="currentuser-chat-text">
      <strong>{props.currentUser.first_name}: </strong>
      {props.message}
    </p>
  );
};

export default Message;
