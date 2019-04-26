import React from 'react';
import { Link } from 'react-router';

const FamilyTile = props => {
  let userList = props.users.map(user => {
    return(
      <div>
        <p>{user.first_name} {user.last_name}: {user.email}</p>
      </div>
    )
  });

  return(
    <div className="family-tile">
      <div className="family-body">
        <Link to={`/families/${props.id}`}><h3 className="family-title">{props.name}</h3></Link>
        <p>User List</p>
        {userList}
      </div>
    </div>
  )
}

export default FamilyTile;
