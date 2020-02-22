import React from 'react';

const Landing = () => (
  <>
    <div className="titleContainer">
      <h1 className="title">Welcome to TICC</h1>
      {/* eslint-disable-next-line */}
      <h3 className="subtitle">Sign in below or <a href="#">request access</a></h3>
    </div>
    <form className="loginForm" id="loginForm">
      <input type="text" className="textInput" id="username" placeholder="Email" />
      <br />
      <input type="password" className="textInput" id="password" placeholder="Password" />
      <br />
      <button className="submitButton">Submit</button>
    </form>
  </>
);

export default Landing;
