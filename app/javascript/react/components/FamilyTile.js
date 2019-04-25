import React from 'react';
import { Link } from 'react-router';

const FamilyTile = props => {
  return(
    <div className="group-tile small-8 row devise">
      <Link to={`/families/${props.id}`}><h3>{props.name}</h3></Link>
    </div>
  )
}

export default FamilyTile;
