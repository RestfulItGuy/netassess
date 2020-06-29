import React from 'react'
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import DocumentUpload from '../DocumentUpload';
import Loader from 'react-loader-spinner';
import Navigation from '../Navigation';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      role: '',
      username: '',
      loading: true,
      docs: []
    }
  }

  componentDidMount() {
    const uid = this.props.firebase.getUserID();
    this.setState({ uid: uid })
    const user = this.props.firebase.user_firestore(uid);
    user.then(vals => {
      this.setState({ role: vals.role })
      this.setState({ username: vals.username })
    })
    this.unsubscribe = this.props.firebase
      .docs_firestore()
      .onSnapshot(snapshot => {
        let docs = [];
        snapshot.forEach(doc =>
          docs.push({ ...doc.data(), uid: doc.id }),
        )
        this.setState({ docs, loading: false })
      })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <>
        {this.state.loading ?
          <Loader
            type="Oval"
            color="#00BFFF"
            height={100}
            width={100}
          /> :
          <>
            <Navigation role={this.state.role} />
            <h1>Welcome, {this.state.username}</h1>
            <DocumentUpload uid={this.state.uid} />
            <ul id="docsList">
              {
                this.state.docs.map(item => (
                  <li key={item.uid}><a href={item.url}>{item.name}</a><br /><span>{item.notes}</span></li>
                ))
              }
            </ul>
          </>
        }
      </>
    )
  }
}

const condition = authUser => !!authUser;
export default withFirebase(withAuthorization(condition)(Home));