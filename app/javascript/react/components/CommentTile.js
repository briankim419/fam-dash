import React from 'react';
import { Link } from 'react-router';

const CommentTile = props => {
  return(
    <div className="comment-tile">
      <h5>{props.text}</h5>
    </div>
  )
}

export default CommentTile;
