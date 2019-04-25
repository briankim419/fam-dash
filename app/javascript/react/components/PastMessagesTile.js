import React from 'react'

const PastMessagesTile = (props) => {

  let pastMessages
  let currentUserId = props.currentUser.id
  if(props.pastMessage != [] && currentUserId) {
    pastMessages = props.pastMessages.map((message) => {
      if(message.user.id == currentUserId) {
        return(
          <p key={message.id} className="currentuser-chat-text">
            <strong>{message.user.first_name}: </strong>
            {message.body}
          </p>
        )
      } else {
        return(
          <p key={message.id} className="chat-text">
            <strong>{message.user.first_name}: </strong>
            {message.body}
          </p>
        )
      }
    })
  }

  return(
    <div> {pastMessages} </div>
  );
};

export default PastMessagesTile
