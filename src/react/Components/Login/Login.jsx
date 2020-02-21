import React from 'react';

function Login() {
  return (
    <div className="Login">
      <form>
        <input id="username" placeholder="username" />
        <br />
        <input id="pass" placeholder="password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
