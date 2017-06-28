import { combineReducers } from 'redux';
import { createStore } from 'redux';

//___DEFAULT APP STATE___
const defaultState = {
  user: {
    info: null
  },
  search: {
    query: null
  }
}

//Actions
//Define what info you will provide when you will dispatch the event
export const updateUserInfo = (userInfo) => {
  return {
    type: 'update_user_info',
    info: userInfo
  }
}

export const updateSearchQuery = (query) => {
  return {
    type: 'update_search_query',
    query: query
  }
}


//Reducers
//Define what to do TO THE STATE with the info you provided when dispatching the action
//Each reducer var name will become a key in the global state

//___REDUCER___
const user = function(state, action){
  if(typeof(state) === 'undefined') return defaultState.user;

  switch(action.type){
    //If user reducer received an update_user_info action, update the state accordingly
    case 'update_user_info' :
      return Object.assign({}, state, {
        info: action.info
      });

    //Else, return the state
    default :
      return state;
  }
}

//___REDUCER___
const search = function(state, action){
  if(typeof(state) === 'undefined') return defaultState.search;
  switch(action.type) {
    case 'update_search_query':
      return Object.assign({}, state, {
        query: action.query
      });

    default:
      return state;
  }
}


//Store
const appStore = combineReducers({user, search});
export const myappStore = typeof window !== 'undefined' ?
createStore(appStore, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
 :
createStore(appStore, defaultState);
