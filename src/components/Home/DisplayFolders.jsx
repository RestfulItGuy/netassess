import React from 'react'
import { withFirebase } from '../Firebase';

class DisplayFolders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFolder: 'root',
      folderStructure: []
    }
  }

  displayFolders = () => {
    let folderArray = []
    this.props.firebase.firestore.collection('folderStructure').where('root', '==', this.state.currentFolder).get().then(snapshot => {
      snapshot.forEach(ref => {
        folderArray.push({ ...ref.data() })
      })
      this.setState({ folderStructure: folderArray })
    })
    return this.state.folderStructure.map(item => (
      <li id={item.folder} onClick={e => this.setState({ currentFolder: e.target.id })}>{item.folder}</li>
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