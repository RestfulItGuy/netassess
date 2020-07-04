import React from 'react'
import { withFirebase } from '../Firebase';

class DisplayFolders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderStructure: []
    }
  }

  displayFolders = () => {
    let folderArray = []
    this.props.firebase.firestore.collection('folderStructure').where('root', '==', this.props.currentFolder).get().then(snapshot => {
      snapshot.forEach(ref => {
        folderArray.push({ ...ref.data() })
      })
      this.setState({ folderStructure: folderArray })
    })
    return this.state.folderStructure.map(item => (
      <li id={item.folder} onClick={this.props.changeFolder}>{item.folder}</li>
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