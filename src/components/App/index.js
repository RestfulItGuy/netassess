import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

import Landing from '../Landing';
import SignUpPage from '../SignUp';
import PasswordForgetPage from '../PasswordForget';
import Profile from '../Home';
import AdminPage from '../Admin';
import Account from '../Account';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import Notifications from '../Notfications';

function App() {
  return (
    < Router >
      <div>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.PROFILE} component={Profile} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.NOTIFICATIONS} component={Notifications} />
      </div>
    </Router >
  )
}

export default withAuthentication(App);