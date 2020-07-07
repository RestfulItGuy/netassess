import React from 'react'
import { withFirebase } from '../Firebase';

class DisplayFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docs: []
    }
  }

  displayFiles = () => {
    let fileArray = []
    this.props.firebase.firestore.collection('docs').where('folder', '==', this.props.currentFolder).get().then(snapshot => {
      snapshot.forEach(ref => {
        fileArray.push({ id: ref.id, ...ref.data() })
      })
      this.setState({ docs: fileArray })
    })
    return this.state.docs.map(item => (
      <li key={item.id}><a href={item.url} id={item.name}>{item.name}</a><span> - {item.notes}</span><br /></li>
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