import React from 'react';
import { withFirebase } from '../Firebase';
import Navigation from '../Navigation';
import Loader from 'react-loader-spinner';
import { withAuthorization } from '../Session';
import AddUser from './AddUser';
//import AddTNAResource from './AddTNAResource';

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
      if (vals.roles.includes("godmin")) {
        this.setState({ role: 'godmin' })
      }
      this.setState({ username: vals.username, loading: false })
    })
  }

  componentWillUnmount() {
  }

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
                <textarea id="notif" onChange={this.updateNotif}></textarea>
                <button onClick={this.addNotif} type="button">Add notification</button>
              </form>
              <AddUser />
              {/* <AddTNAResource /> */}
            </>
        }
      </>
    )
  }
}

const condition = authUser => !!authUser;
export default withFirebase(withAuthorization(condition)(AdminPage));
