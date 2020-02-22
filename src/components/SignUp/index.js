import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase'

//Create object with expected blank state to quickly reset if needed
const INITAL_STATE = {
  username: 'Greg Orchard',
  email: 'asdf@asdf.com',
  passwordOne: 'asdfasdf',
  passwordTwo: 'asdfasdf',
  error: null
}

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

class SignUpFormBase extends Component{
  constructor(props){
    super(props);
    this.state = {...INITAL_STATE}
  }

  /* TODO: Only create user auth once user has been added to DB. Possible bug: User info blank
     while user login successful. */
  onSubmit = event => {
    const {username, email, passwordOne } = this.state; //Get the values from state
    this.props.firebase
      //Creates email/pass authentication combo
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        //Adds other user info to a database
        return this.props.firebase
        .user_firestore(authUser.user.uid)
        .set({
          username,
          email
        });
      })
      .then(() => {
        this.setState({...INITAL_STATE}) //Reset state
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({error});
      })
    event.preventDefault();
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  render(){
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    //Returns true if any of the conditions are met
    const formInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne.length <= 2 ||
      email.length <= 2 ||
      username.length <= 2;

    return(
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        {/* Disable submit if formInvalid returns true */}
        <button disabled={formInvalid} type="submit">Sign Up</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const SignUpLink = () => (
  <p>No account yet? <Link to={ROUTES.SIGN_UP}>Sign up</Link></p>
)

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export {SignUpForm, SignUpLink};
