//React
import React from 'react';
import ReactDOM from 'react-dom';

//Router
import { Route } from 'react-router-dom';


//Components import
import Header from './header.jsx';
import LoginSignupForm from './account.jsx';

//Stylus
import '../../stylus/main.styl';


//_____________COMPONENT_____________
//Layout where every page component is rendered
export default class App extends React.Component {
  //Initial state
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div id="react-app">
        <Header />
        <Route path="/login" component={()=> <LoginSignupForm mode='login'/>} />
        <Route path="/signup" component={()=> <LoginSignupForm mode='signup'/>} />
      </div>
    );
  }
};
