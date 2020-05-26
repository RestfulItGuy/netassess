import React, { useContext } from 'react'
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import UserContext from '../context/UserContext';
//import { UserConsumer } from '../context/UserContext';

const Account = () => {
  const user = useContext(UserContext)
  console.log(user)
  return <div>{user.uid}</div>
}

const condition = authUser => !!authUser;
export default withFirebase(withAuthorization(condition)(Account));