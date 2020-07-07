import React, { Component } from 'react'
import Select from 'react-select'
import { options, units } from '../../constants/dataArrays'
import { withFirebase } from '../Firebase';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainerChecked: null,
      userInfo: {
        selectedRole:
          { value: 'ceo', label: "CEO" },
        firstName: 'test',
        lastName: 'dc',
        email: 'dc@ticc.com',
        bestContact: '0468359479',
        altContact: null,
      },
      selectedUnit: {}
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

  handleCheck = () => {
    this.setState({ trainerChecked: !this.state.trainerChecked })
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
          <input name="bestContact" required onChange={event => this.onChangeUserInfo(event)} /><br />
          <label>Alt. Contact: </label>
          <input name="altContact" onChange={event => this.onChangeUserInfo(event)} /><br />
          <Select value={selectedRole}
            onChange={this.handleRoleChange}
            options={options}
            isMulti />
          {/* <label>Conducts Training?</label>
          <input type="checkbox" onChange={this.handleCheck} /> */}
          {this.state.trainerChecked ? <Select value={selectedRole}
            onChange={this.handleRoleChange}
            options={units}
            isMulti /> : <span></span>}
          <button type="button" onClick={this.addUser}>Add User</button>
        </form>
      </>
    )
  }
}
export default withFirebase(AddUser)