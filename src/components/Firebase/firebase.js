import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

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

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.firestore = app.firestore();
    this.storage = app.storage();
    this.storageRef = this.storage.ref()
  }

  //USER API FUNCTOIN (FIRESTORE)
  users_firestore = () => this.firestore.collection('users');
  user_firestore = uid => this.firestore.collection('users').doc(uid).get().then(function (doc) {
    if (doc.exists) {
      return doc.data();
    } else {
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });

  //AUTH API FUNCTIONS
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => {
    this.auth.signOut().then(() => { window.location.href = '/' })
  }
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  getUserID = () => {
    if (this.auth.currentUser !== null) {
      return this.auth.currentUser.uid
    }
  }

  uploadFile = filedata => {
    const promises = [];
    const name = filedata.name;
    const uploadTask = this.storage.ref(`docs/${filedata.name}`).put(filedata);
    promises.push(uploadTask);

    uploadTask.on(
      'state_changed',
      null,
      null,
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          app.firestore().collection(`docs`).doc(name).set({ name: name, url: downloadURL })
        });
      }
    )
  }

  getDocList = () => {
    let docsArray = []
    let docsRef = app.firestore().collection('docs');
    docsRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          docsArray.push([doc.data().name, doc.data().url])
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    return docsArray;
  }
}

export default Firebase;
