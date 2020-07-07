import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

//production config
// const firebaseConfig = {
//   apiKey: "AIzaSyAqGiaRxBJCMR8AiHiYyFHdImH-kQweCWY",
//   authDomain: "netassess-337d0.firebaseapp.com",
//   databaseURL: "https://netassess-337d0.firebaseio.com",
//   projectId: "netassess-337d0",
//   storageBucket: "netassess-337d0.appspot.com",
//   messagingSenderId: "146418653876",
//   appId: "1:146418653876:web:e155d14f6fe83ac1c155e1",
//   measurementId: "G-5P6J4Z2ELS"
// };

//test config
const firebaseConfig = {
  apiKey: "AIzaSyA7utCvt2GjvOKHutwWGvI0OxQSGGHuz_c",
  authDomain: "testfirebase-85393.firebaseapp.com",
  databaseURL: "https://testfirebase-85393.firebaseio.com",
  projectId: "testfirebase-85393",
  storageBucket: "testfirebase-85393.appspot.com",
  messagingSenderId: "833817206190",
  appId: "1:833817206190:web:c6f92e36fe8144d5ff3c3f"

}

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.firestore = app.firestore();
    this.storage = app.storage();
    this.storageRef = this.storage.ref()
  }

  docs_firestore = () => this.firestore.collection('docs')

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

  uploadFile = (filedata, meta, docRoles, currentFolder) => {
    const roles = []
    docRoles.forEach(role => {
      roles.push(role.value)
    });
    const docs_firestore = this.firestore.collection('docs');
    const uploadTask = this.storage.ref().child(`docs/` + filedata.name).put(filedata);
    uploadTask.on(app.storage.TaskEvent.STATE_CHANGED,
      null, null,
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          docs_firestore.add({ name: filedata.name, url: downloadURL, notes: meta, roles: roles, folder: currentFolder })
        });
      }
    )
  }

  uploadFile_STATE = (data) => {
    const docs_firestore = this.firestore.collection('docs');
    data.filedata = null;
    docs_firestore.doc('fdsa').set(data)
  }

  addNotif = (notif, user) => {
    const notif_firestore = this.firestore.collection('notifs');
    notif_firestore.add({ text: notif, user: user, seenBy: [] })
  }

  getNotifs = () => this.firestore.collection('notifs')

  updateSeenBy = (notifId, userId) => {
    this.firestore.collection('notifs').doc(notifId).update({
      seenBy: app.firestore.FieldValue.arrayUnion(userId)
    })
  }

  addUser = (info) => {
    this.doCreateUserWithEmailAndPassword(info.email, 'password').then(authUser => {
      const roles = []
      info.selectedRole.forEach(role => { roles.push(role.value) });
      return this.firestore.collection("users").doc(authUser.user.uid).set({
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
        bestContact: info.bestContact,
        altContact: info.altContact,
        roles: roles
      })
    })
  }

  newfolder = (newFolder, currentFolder) => {
    return this.firestore.collection('folderStructure').add({ folder: newFolder, root: currentFolder })
  }

  deleteFolder = (id) => {
    //Get folder id
    //Get id array of all subfolders
    //Get id array of all docs in folder
    //Get id array of all docs in subfolders
    //Merge folder ids into one array
    //foreach folder array delete by doc id
    //Merge doc ids into one array
    //foreach doc array delete by doc id
  }
}

export default Firebase;
