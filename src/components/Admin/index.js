import React  from 'react';
import { withFirebase } from '../Firebase';

class AdminPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      user: null,
      users: []
    }    
  }

  componentDidMount(){
    let users = []
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      if(authUser){
        this.props.firebase
        .user_firestore(authUser.uid)
        .onSnapshot(snapshot => {
          this.setState({
            user: snapshot.data(),
            loading: false,
            username: snapshot.data().username
          });
        });
      }
    }, error => {
      console.log(error)
    }).bind(this);

    // Get list of all users
    this.unsubscribe = this.props.firebase
    .users_firestore()
    .onSnapshot(snapshot => {
      snapshot.forEach((doc) => {
         users.push({
           id: doc.id,
           name: doc.data().username,
           email: doc.data().email
         })
       })
       this.setState({users, loading: false})
     });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render(){
    const { users, loading } = this.state;
    return(
      <>
        <h1>Welcome: {this.state.username}</h1>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </>
    )
  }
}

const UserList = ({users}) => (
  users.map((p) => (
    <div key={p.id}>
      <h1>{p.name}</h1>
      <p>{p.email}</p>
    </div>
  ))
)

export default withFirebase(AdminPage)