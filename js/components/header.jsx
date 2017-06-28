import React from 'react';
import ReactDOM from 'react-dom';

import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { myappStore, updateUserInfo } from '../../config/redux/actions.js';

//Tools
import tools from '../tools/tools.js';

import '../../stylus/header.styl';


//_____________COMPONENT_____________
//Global header
class Header extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <header>
        <h1><Link to="/">Universal Allstar Starterkit</Link></h1>
        <nav>
          <ul>
            <li>
              <small>{this.props.userInfo ? "Welcome "+this.props.userInfo.local.username : ''}</small>
              <Menu userInfo={this.props.userInfo} />
            </li>
          </ul>
        </nav>
      </header>
    );
  }
};

//Redux
function mapStateToProps(state){
  return {
    userInfo: state.user.info
  }
}
export default Header = connect(mapStateToProps)(Header);


//_____________COMPONENT_____________
// Displays different account actions if user is logged in or not
class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state = { logoutSuccess: false };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e){
    e.preventDefault();

    tools.xhr({
      type:"get",
      url: "/api/user/logout",
      success: (xhrThis)=> {
        this.setState({logoutSuccess: true});
        myappStore.dispatch(updateUserInfo(null));
      }
    })
  }

  render(){
    if(this.props.userInfo != null){
      return(
        <div className="account-actions">
          <a href="/api/user/logout" onClick={this.handleLogout} className="boxed">logout</a>
          <Link to="/account" className="boxed">account</Link>
          {this.state.logoutSuccess &&
            <Redirect to="/" push />
          }
        </div>
      )
    } else {
      return (
        <div className="account-actions">
          <Link to="/login" className="boxed">Login</Link>
          <Link to="/signup" className="boxed">Create account</Link>
        </div>
      );
    }

  }
}
