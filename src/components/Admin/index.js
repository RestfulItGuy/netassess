import React from 'react';
import { withFirebase } from '../Firebase';
import Navigation from '../Navigation';
import Loader from 'react-loader-spinner';
import { withAuthorization } from '../Session';
import AddUser from './AddUser';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      uid: '',
      username: '',
      notif: ''
    }
  }

  componentDidMount() {
    const uid = this.props.firebase.getUserID();
    const userInfo = this.props.firebase.user_firestore(uid);
    this.setState({ uid: uid })
    userInfo.then(vals => {
      this.setState({ role: vals.roles, username: vals.username })
      this.setState({ loading: false })
    })
  }

  handleChange = userRoles => {
    this.setState(
      { userRoles }
    );
  };

  updateNotif = () => {
    this.setState({ notif: document.getElementById("notif").value })
  }

  addNotif = () => {
    this.props.firebase.addNotif(this.state.notif, this.state.uid, this.state.urgentNotif)
    document.getElementById("notif").value = ''
  }

  render() {
    return (
      <>
        {
          this.state.loading ?
            <Loader
              type="Oval"
              color="#00BFFF"
              height={100}
              width={100}
            /> :
            <>
              <Navigation role={this.state.role} />
              <form>
                <span>Add notification</span><br></br>
                <textarea id="notif" onChange={this.updateNotif}></textarea>
                <button onClick={this.addNotif} type="button">Add notification</button>
              </form>
              <AddUser />
            </>
        }
      </>
    )
  }
}

const condition = authUser => !!authUser;
export default withFirebase(withAuthorization(condition)(AdminPage));
