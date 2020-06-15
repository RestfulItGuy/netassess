import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //TODO: Button disabled unless agreement checked
      notifs: [],
      notifsCount: 0,
      loading: true,
      disableAgreementButton: true,
      uid: this.props.firebase.getUserID()
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.firebase
      .getNotifs()
      .onSnapshot(snapshot => {
        let notifs = [];
        snapshot.forEach(doc => {
          console.log("Seen by: " + doc.data().seenBy)
          if (!doc.data().seenBy.includes(this.state.uid)) {
            notifs.push({ ...doc.data(), uid: doc.id })
          }
        })
        this.setState({ notifs, notifsCount: notifs.length, loading: false })
        if (this.state.notifsCount === 0) {
          this.props.history.push(ROUTES.PROFILE);
        }
      })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  buttonToggle = () => {
    var inputElems = document.getElementsByTagName("input"), count = 0;

    for (var i = 0; i < inputElems.length; i++) {
      if (inputElems[i].type === "checkbox" && inputElems[i].checked === true) {
        count++;
      }
    }
    if (count === this.state.notifsCount) {
      this.setState({ disableAgreementButton: false })
    } else {
      this.setState({ disableAgreementButton: true })
    }
  }

  notifAgreement = () => {
    this.state.notifs.forEach(item => {
      this.props.firebase.updateSeenBy(item.uid, this.props.firebase.getUserID());
    })

    this.props.history.push(ROUTES.PROFILE);
  }
  render() {
    return (
      <>
        {
          this.state.loading ?
            <p>loading</p>
            :
            <>
              <div>
                <h1>Notifications {this.state.notifsCount}</h1>
                <ul id="notifs">
                  {
                    this.state.notifs.map(item => (
                      <li key={item.uid}><span>{item.text}</span><input onChange={this.buttonToggle} id={item.uid} type="checkbox" /></li>
                    ))
                  }
                </ul>
                <button type="button" disabled={this.state.disableAgreementButton} onClick={this.notifAgreement}>I have read and agree to all</button>
              </div>
            </>
        }
      </>
    )
  }
}

const condition = authUser => !!authUser;
export default withFirebase(withAuthorization(condition)(Notifications));
