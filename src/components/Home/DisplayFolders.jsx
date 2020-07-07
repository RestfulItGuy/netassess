import React from 'react'
import { withFirebase } from '../Firebase';

class DisplayFolders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderStructure: []
    }
  }

  deleteFolder = () => {
  }

  displayFolders = () => {
    let folderArray = []
    this.props.firebase.firestore.collection('folderStructure').where('root', '==', this.props.currentFolder).get().then(snapshot => {
      snapshot.forEach(ref => {
        folderArray.push({ id: ref.id, ...ref.data() })
      })
      this.setState({ folderStructure: folderArray })
    })
    return this.state.folderStructure.map(item => (
      <li key={item.id} id={item.id} onClick={this.props.changeFolder}>{item.folder} <span className="deleteButton" id={item.id} onClick={this.deleteFolder}>Delete Folder?</span></li>
    ))
  }

  render() {
    return (
      <>
        {this.displayFolders()}
      </>
    )
  }
}

export default withFirebase(DisplayFolders)