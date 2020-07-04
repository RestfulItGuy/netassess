import React from 'react'
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import DocumentUpload from '../DocumentUpload';
import Loader from 'react-loader-spinner';
import Navigation from '../Navigation';
import DisplayFolders from './DisplayFolders';
import DisplayFiles from './DisplayFiles';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      role: '',
      username: '',
      loading: true,
      docs: [],
      error: '',
      newFolder: '',
      currentFolder: 'root',
      folderStructure: []
    }
  }

  componentDidMount() {
    const uid = this.props.firebase.getUserID();
    this.setState({ uid: uid })
    const user = this.props.firebase.user_firestore(uid);
    user.then(vals => {
      console.log(vals)
      if (vals.roles.includes("godmin")) {
        this.setState({ role: 'godmin' })
      }
      this.setState({ username: vals.username })
    })
    this.unsubscribe = this.props.firebase
      .docs_firestore()
      .onSnapshot(snapshot => {
        let docs = [];
        if (snapshot.empty) {
          this.setState({ error: "No documents. Upload one or create a folder" })
        }
        snapshot.forEach(doc =>
          docs.push({ ...doc.data(), uid: doc.id }),
        )
        this.setState({ docs, loading: false })
      })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  newFolder = () => {
    const newFolder = document.getElementById("newFolder");
    this.props.firebase.newfolder(newFolder.value, this.state.currentFolder)
    newFolder.value = ''
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
            <form>
              <h3>Add folder</h3>
              <input id="newFolder" />
              <button type="button" onClick={this.newFolder}>Add folder</button>
            </form>
            <DocumentUpload uid={this.state.uid} currentFolder={this.state.currentFolder} />
            <div id="folderUI">
              <DisplayFolders />
              <DisplayFiles />
              {/* {this.displayFolders()}
              {this.displayFiles()} */}
            </div>
            {this.state.error}
          </>
        }
      </>
    )
  }
}

const condition = authUser => !!authUser;
export default withFirebase(withAuthorization(condition)(Home));