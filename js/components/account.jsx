import React from 'react';
import ReactDOM from 'react-dom';

import { Redirect } from 'react-router-dom';
import {myappStore, updateUserInfo} from '../../config/redux/actions.js';

//Tools
import tools from '../tools/tools.js';

//_____________COMPONENT_____________
// Login/Signup form
export default class LoginSignupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {success: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    var credentials = {
      'username': e.target.querySelector('input[name=username]').value,
      'password': e.target.querySelector('input[name=password]').value
    };

    tools.xhr({
      type:"post",
      url:this.props.mode == 'login' ? "/api/login" : "/api/signup",
      json: credentials,
      success: (xhrThis)=>{
        var userInfo = JSON.parse(xhrThis.responseText);
        if(typeof(userInfo) != 'string' ){
          this.setState({success: true});
          myappStore.dispatch(updateUserInfo(userInfo))
        } else {
          console.log(userInfo);
        }
      }
    })
  }

  render(){
    var welcomeText;
    if(this.props.mode == 'login') welcomeText = "Enter your login information";
    if(this.props.mode == 'signup') welcomeText = "Enter your desired username and password";
    return(
      <div className="content_box">
        <h2>{welcomeText}</h2>
        <form onSubmit={this.handleSubmit} method="post" action="">
          <input name="username" type="text" placeholder="Username"/>
          <input name="password" type="password" placeholder="Password"/>
          <button>Ok</button>
        </form>

        {this.state.success &&
          <Redirect to="/" push />
        }

      </div>
    );
  }
}
