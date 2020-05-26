import React from 'react';

import { withFirebase } from '../Firebase';

class username extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.props.firebase
          .user_firestore(authUser.uid)
          .onSnapshot(snapshot => {
            this.setState({
              user: snapshot.data(),
              loading: false,
              username: snapshot.data().username,
              role: snapshot.data().role
            });
          });
      }
    }, error => {
      console.log(error)
    }).bind(this);
  }

  render() {
    return (
      <>
        {this.state.username}
      </>
    )
  }
}

export default withFirebase(username);