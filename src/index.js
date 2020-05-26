import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';
import { UserProvider } from './components/context/UserContext';

import "../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css"

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <UserProvider>
      <App />
    </UserProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
