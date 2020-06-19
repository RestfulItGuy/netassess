import React, { Component } from 'react'
import Select from 'react-select'
import { options } from '../../constants/roles'
import { withFirebase } from '../Firebase';

const units = [
  'wah',
  'const',
  'ss',
  'crane'
]

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        selectedRole: { value: null },
        firstName: null,
        lastName: null,
        email: null,
        bestContact: null,
        altContact: null,
      }
    }
  }

  onChangeUserInfo(event) {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [event.target.name]: event.target.value
      }
    })
  }

  handleRoleChange = selectedRole => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        selectedRole
      }
    });
  };

  addUser = () => {
    this.props.firebase.addUser(this.state.userInfo)
  }

  render() {
    const { selectedRole } = this.state;
    return (
      <>
        <h3>Add new user</h3>
        <form>
          <label>First Name: </label>
          <input name="firstName" required onChange={event => this.onChangeUserInfo(event)} /><br />
          <label>Last Name: </label>
          <input name="lastName" required onChange={event => this.onChangeUserInfo(event)} /><br />
          <label>Email: </label>
          <input name="email" required onChange={event => this.onChangeUserInfo(event)} /><br />
          <label>Best Contact: </label>
          <input name="defaultContact" required onChange={event => this.onChangeUserInfo(event)} /><br />
          <label>Alt. Contact: </label>
          <input name="altContact" onChange={event => this.onChangeUserInfo(event)} /><br />
          <Select value={selectedRole}
            onChange={this.handleRoleChange}
            options={options}
            isMulti />
          <button type="button" onClick={this.addUser}>Add User</button>
        </form>
      </>
    )
  }
}
export default withFirebase(AddUser)