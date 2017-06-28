import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

import { BrowserRouter } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import { myappStore , updateUserInfo } from '../../config/redux/actions.js';

let unsubscribe = myappStore.subscribe(() =>
  console.log("New global state : ", myappStore.getState())
);

//Tools
import tools from '../tools/tools.js';

export default class AppClient extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.getUserInfo();
  }

  //App Methods
  getUserInfo(){
    var that = this;
    tools.xhr({
      type:"get",
      url:"api/user/info",
      success: function(xhrThis){
        var userInfo = JSON.parse(xhrThis.responseText);
        userInfo = userInfo.error == true ? null : userInfo;
        console.log("user info received from API : ", userInfo);
        //Dispatch info to Redux Store
        myappStore.dispatch(updateUserInfo(userInfo));
      }
    });
  }
  render(){
    return(
      <Provider store={myappStore}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    )
  }
}
ReactDOM.render(
  <AppClient/>,
  document.querySelector("#app")
);
