// import React, { Component } from 'react'
// import { withFirebase } from '../Firebase';

// class AddUser extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     }
//     this.setRef = ref => {
//       this.file = ref
//     }
//   }

//   extractTitle = () => {
//     const fileList = this.file.files;
//     for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
//       const file = fileList[i];
//       console.log(file)
//     }
//   }

//   render() {
//     const { selectedRole } = this.state;
//     return (
//       <>
//         <h3>Add Training & Assessment Resource</h3>
//         <form>
//           <label>TNA Code:</label>
//           <input id="code" />
//           <input type="file" id="files" onChange={this.extractTitle} ref={this.setRef} multiple />
//         </form>
//       </>
//     )
//   }
// }
// export default withFirebase(AddUser)