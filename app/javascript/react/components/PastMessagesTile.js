import React from 'react'

const PastMessagesTile = (props) => {

  let pastMessages
  let currentUserId = props.currentUser.id
  if(props.pastMessage != [] && currentUserId) {
    pastMessages = props.pastMessages.map((message) => {
      if(message.user.id == currentUserId) {
        return(
          <div key={message.id} className="currentuser-chat-text">
            <strong className="user-name">{message.user.first_name}: </strong>
              <p className="chat-message">{message.body}</p>
          </div>
        )
      } else {
        return(
          <div key={message.id} className="chat-text">
            <strong className="user-name">{message.user.first_name}: </strong>
            <p className="chat-message">{message.body}</p>
          </div>
        )
      }
    })
  }

  return(
    <div> {pastMessages} </div>
  );
};

export default PastMessagesTile
