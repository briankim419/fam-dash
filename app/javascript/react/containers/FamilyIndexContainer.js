import React, { Component } from 'react';
import FamilyTile from '../components/FamilyTile';


class FamilyIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      families: []
    }
  }

  componentDidMount() {
    fetch(`/api/v1/families`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ families: body.families });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let allFamilies

    if(this.state.families.length > 0){
      allFamilies = this.state.families.map( families => {
        return(
          <FamilyTile
            key={families.id}
            id={families.id}
            name={families.family_name}
            users={families.users}
          />
        )
      });
    }

    return(
      <div className="family-index">
        <h2>Click on the family name to view portal</h2>
        {allFamilies}
      </div>
    );
  }
};

export default FamilyIndexContainer;
