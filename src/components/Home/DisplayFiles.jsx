import React from 'react'
import { withFirebase } from '../Firebase';

class DisplayFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFolder: 'root',
      docs: []
    }
  }

  displayFiles = () => {
    let fileArray = []
    this.props.firebase.firestore.collection('docs').where('folder', '==', this.state.currentFolder).get().then(snapshot => {
      snapshot.forEach(ref => {
        fileArray.push({ ...ref.data() })
      })
      this.setState({ docs: fileArray })
    })
    return this.state.docs.map(item => (
      <li id={item.name}>{item.name}</li>
    ))
  }


  render() {
    return (
      <>
        {this.displayFiles()}
      </>
    )
  }
}

export default withFirebase(DisplayFiles)