import React from 'react';

import { withAuthorization } from '../Session';

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

const condition = authUser => !!authUser; //If the user isn't logged in, redir to sign in
export default withAuthorization(condition)(Home);
