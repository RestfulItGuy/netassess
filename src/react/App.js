import React from 'react';
import './App.css';

import Login from './Components/Login/Login';
import Title from './Components/Title/Title';
import Error from './Components/Error/Error';

function App() {
  return (
    <div className="App">
      <Title />
      <Error errorMessage="Login" />
      <Login />
    </div>
  );
}

export default App;
