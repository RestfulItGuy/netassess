import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

//.env config
const firebaseConfig = {
  apiKey: "AIzaSyAqGiaRxBJCMR8AiHiYyFHdImH-kQweCWY",
  authDomain: "netassess-337d0.firebaseapp.com",
  databaseURL: "https://netassess-337d0.firebaseio.com",
  projectId: "netassess-337d0",
  storageBucket: "netassess-337d0.appspot.com",
  messagingSenderId: "146418653876",
  appId: "1:146418653876:web:e155d14f6fe83ac1c155e1",
  measurementId: "G-5P6J4Z2ELS"
};

class Firebase{
  constructor(){
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database();
    this.firestore = app.firestore();
  }

  getUserID = () => {
    this.auth.onAuthStateChanged(authUser => {
      if(authUser){
        return authUser.uid;
      }
    })
  }

  //USER API FUNCTOIN (FIRESTORE)
  users_firestore = () => this.firestore.collection('users');
  user_firestore = uid => this.firestore.collection('users').doc(uid);

  //USER API FUNCTIONS (RTD)
  // users = () => this.db.ref('users');
  // user = uid => this.db.ref(`users/${uid}`);
  
  //AUTH API FUNCTIONS
  doCreateUserWithEmailAndPassword = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => {
    this.auth.signOut().then(() => {window.location.href = '/'})
  }
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  isCurrentUser = () => {
    if(this.auth.currentUser !== null){
      return true
    }
  }
}

export default Firebase;
