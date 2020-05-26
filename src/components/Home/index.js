import React from 'react'
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import DocumentUpload from '../DocumentUpload';
import Loader from 'react-loader-spinner'
let urlArray = []

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      role: '',
      username: '',
      loading: true
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
    this.getData();
  }

  getData = () => {
    var itemArray = []
    var listRef = this.props.firebase.storage.ref();
    listRef.child('docs').listAll().then(function (res) {
      res.items.forEach(function (itemRef) {
        itemArray.push(itemRef.name)
      });
    }).then(() => {
      itemArray.forEach(item => {
        listRef.child('docs/' + item).getDownloadURL().then(url => {
          urlArray.push([item, url])
          this.setState({ loading: false })
        })
      })
    })
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
            <h1>Welcome, {this.state.username}</h1>
            <DocumentUpload uid={this.state.uid} />
            <ul id="docsList">
              {
                urlArray.map(item => (
                  <li key={item[0]}><a href={item[1]}>{item[0]}</a></li>
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