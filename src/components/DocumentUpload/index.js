import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Select from 'react-select'

import { options, defaultUploadRoles } from '../../constants/roles'

class DocumentUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      error: '',
      errorCode: '',
      textData: '',
      filedata: null,
      selectedOption: defaultUploadRoles
    }

    this.setRef = ref => {
      this.file = ref
    }
    this.uploadFile = this.uploadFile.bind(this);
  }


  handleChange = selectedOption => {
    this.setState(
      { selectedOption }
    );
  };

  extractFileName = () => {
    // TODO: check for spelling mistakes?
    var re = /^[A-Za-z]+$/;
    var num_re = /^[0-9]+$/;
    var fullPath = document.getElementById("upload").value;
    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    var filename = fullPath.substring(startIndex);
    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
      filename = filename.substring(1);
      this.setState({ fileName: filename })
      var nameArray = filename.split("-");
      var i = 0;
      var valid = false;
      nameArray.forEach(element => {
        i++;
        if (nameArray.length !== 5) {
          //Filename must contain 5 sections
          valid = false;
          this.setState({ errorCode: 1 })
          this.setState({ error: "Filename must be composed of 5 parts like AAA-BBB-CCC-000 Filename" })
        }
        if (i < 5) {
          //Each alphnumeric code must be exactly 3 chars long
          if (element.length !== 3) {
            this.setState({ errorCode: 2 })
            this.setState({ error: "Invalid code lengths. Filename must be composed of 4 parts each containing 3 characters like AAA-BBB-CCC-000" })
            valid = false;
          }
          //Check first 3 parts only contain letters (no numbers/spaces/special characters)
          if (i < 4) {
            if (!re.test(element)) {
              this.setState({ errorCode: 3 })
              this.setState({ error: "Non alphabetic characters. The first three parts of the identifier code must only contain LETTERS (no spaces, numbers or special characters)" })
              valid = false;
            }
          }
          //Check first 3 parts only contain numbers (no letters/spaces/special characters)
          else if (i === 4) {
            if (!num_re.test(element)) {
              this.setState({ errorCode: 3 })
              this.setState({ error: "Non numeric characters. The last part of the identifier code must only contain NUMBERS (no spaces, letters or special characters)" })
              valid = false;
            }
          }
        }
        //If nothing trips the flag then the filename is valid and can be uploaded
        else { valid = true; }
      });
      if (valid === true) { this.setState({ error: 'File Ready to upload' }) }
      console.log(valid)
    }
    const file = this.file.files[0]
    this.setState({ filedata: file })
  }

  getTextData = () => {
    const notes = document.getElementById("notes");
    this.setState({ textData: notes.value })
  }

  uploadFile = () => {
    this.props.firebase.uploadFile(this.state.filedata, this.state.textData, this.state.selectedOption)
  }

  logOptions = () => {
    console.log(this.state)
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <>
        <h3>Upload new document</h3>
        <form>
          <input type="file" id="upload" onChange={this.extractFileName} ref={this.setRef} /><br />
          <textarea placeholder="Notes" id="notes" onChange={this.getTextData}></textarea><br />
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            isMulti
            options={options}
          />
          <button type="button" onClick={this.uploadFile}>Upload</button>
        </form>
        <span>{this.state.error}</span>
      </>
    )
  }
}
export default withFirebase(DocumentUpload);