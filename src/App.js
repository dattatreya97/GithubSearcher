import React, { Component } from 'react';
import Github from './Github';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Auth0Lock from 'auth0-lock';
import Header from './Components/Header'

class App extends Component {

  constructor(props){
    super(props);

    this.state={
      idToken:'',
      profile:{}
    };
  }

  static defaultProps={
    clientID:'enter clientID from auth0 account',
    domain:'enter domain name from auth0 account'
  }

  componentWillMount(){
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain);
    this.lock.on("authenticated", (authResult)=> {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if(error){
          console.log(error);
          return;
        }
        var x = authResult.accessToken;
        localStorage.setItem('idToken', x);
        localStorage.setItem('profile', JSON.stringify(profile));

        this.setState({
          idToken: localStorage.getItem('idToken'),
          profile: JSON.parse(localStorage.getItem('profile'))
        });
        console.log('hey user');
      });
    });

    this.getProfile();
  }




    getProfile(){
      if(localStorage.getItem('idToken') != null){
        this.setState({
          idToken: localStorage.getItem('idToken'),
          profile: JSON.parse(localStorage.getItem('profile'))
        }, () => {
          console.log(this.state);
        });
      }
    }

    logout(){
      this.setState({
        idToken: '',
        profile: ''
      }, () => {
        localStorage.removeItem('idToken');
        localStorage.removeItem('profile');

      });
    }


  showLock(){
    this.lock.show();
  }

  render() {
    let gitty;
    if(this.state.idToken){
      gitty = <Github />
    }else{
      gitty="Please login to continue";
    }
    return (
      <div className="App">
        <Header
          idToken={this.state.idToken} lock={this.lock}
           onLogout={this.logout.bind(this)} onLogin={this.showLock.bind(this)}/>
        {gitty}
      </div>
    );
  }
}

export default App;
