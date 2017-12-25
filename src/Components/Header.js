import React,{ Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends Component {

  onLogin(){
    this.props.onLogin();
  }

  onLogout(){
    this.props.onLogout();
  }



  render(){
    let gitty='';
    if(this.props.idToken){
      gitty = <NavItem href="#" onClick={this.onLogout.bind(this)}>Logout</NavItem>;
    }else{
      gitty = <NavItem href="#" onClick={this.onLogin.bind(this)}>Login </NavItem>;
    }
    return(
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          Github Searcher
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        {gitty}
      </Nav>
    </Navbar>
    );
  }
}

export default Header;
