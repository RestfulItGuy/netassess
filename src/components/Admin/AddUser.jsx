import React, { Component } from 'react'
import Select from 'react-select'
import { options } from '../../constants/roles'
import { units } from '../../constants/units'
import { withFirebase } from '../Firebase';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRoles: [],
      unitState: [],
      users: []
    }
  }

  handleRoleChange = userRoles => {
    this.setState(
      { userRoles }
    );
  };

  handleUnitsChange = unitState => {
    this.setState(
      { unitState }
    );
  };

  handleInput = ({ target }) => {
    this.setState({ [target.id]: target.value })
  }

  addUser = () => {
    this.props.firebase.addUser(this.state)
  }

  render() {
    const { userRoles } = this.state;
    const { unitState } = this.state;
    return (
      <div>
        <form>
          <span>Add user</span><br />
          <input id="firstName" placeholder="First Name" onChange={this.handleInput} /><br />
          <input id="lastName" placeholder="Last Name" onChange={this.handleInput} /><br />
          <input id="birthday" placeholder="Birthday" onChange={this.handleInput} /><br />
          <input id="prefName" placeholder="Preferred Name" onChange={this.handleInput} /><br />
          <input id="email" placeholder="Email" onChange={this.handleInput} /><br />
          <input id="homePhone" placeholder="Home phone" onChange={this.handleInput} /><br />
          <input id="mobilePhone" placeholder="Mobile" onChange={this.handleInput} /><br />
          <input id="fax" placeholder="Fax" onChange={this.handleInput} /><br />
          <input id="address" placeholder="Address" onChange={this.handleInput} /><br />
          <Select
            value={userRoles}
            onChange={this.handleRoleChange}
            options={options}
          />
          {this.state.userRoles.value === 'trainerAssesor' ?
            <Select
              value={unitState}
              onChange={this.handleUnitsChange}
              options={units}
              isMulti
            /> : console.log(false)}
          {/*trainer pulls up list of courses they can give*/}
          <button type="button" onClick={this.addUser}>Add user</button>
        </form>
      </div>
    )
  }
}
export default withFirebase(AddUser)