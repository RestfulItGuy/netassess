import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false
    }
  }

  componentDidMount() {
    if (this.props.role === 'godmin') {
      this.setState({ admin: true })
    }
  }

  render() {
    return this.state.admin ? <NavigationAdmin /> : <NavigationNonAdmin />
  }
}

const NavigationNonAdmin = () => (
  <>
    <div>
      <ul>
        <li>
          <Link to={ROUTES.PROFILE}>Home</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
    <hr />
  </>
);

const NavigationAdmin = () => (
  <>
    <div>
      <ul>
        <li>
          <Link to={ROUTES.PROFILE}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
    <hr />
  </>
)

export default Navigation;
