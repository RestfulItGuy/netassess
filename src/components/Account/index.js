import React from 'react'
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import Navigation from '../Navigation';

class Account extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
      </div>
    )
  }
}


const condition = authUser => !!authUser;
export default withFirebase(withAuthorization(condition)(Account));