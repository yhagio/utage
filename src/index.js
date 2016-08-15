import React from 'react';
import { render } from 'react-dom';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';

import { checkIfAuthed } from './helpers/authentication';
import * as reducers from 'redux/modules';
import getRoutes from './config/routes';

// redux store set up
const store = createStore(
  combineReducers({...reducers, routing: routerReducer}),
compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

const history = syncHistoryWithStore(hashHistory, store);

// Protecting routes and check if user is authenticated
function checkAuth (nextState, replace) {
  if (store.getState().users.isFetching === true) {
    return;
  }

  const isAuthed = checkIfAuthed(store);
  const nextPathName = nextState.location.pathname;
  // You cannot go to authenticate route if already authenticated
  if (nextPathName === '/authenticate') {
    if (isAuthed === true) {
      replace('/');
    }

  // If user is trying to access event edit page, and
  // if the user is not authenticated or not the event's author,
  // redirects to the event page
  } else if (nextState.location.pathname.startsWith('events/') && nextState.location.pathname.endsWith('/edit')) {
    if (isAuthed !== true || store.getState().users.authedUser.uid !== store.getState().event.event.uid) {
      replace(nextState.location.pathname.replace('/edit', ''));
    }

  // If not authenticated, redirect to authenticate route
  } else {
    if (isAuthed !== true) {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          replace('/authenticate');
        }
        return;
      });
    }
  }
}

/** ***************
 * Send Notification when new event is available
 * ON HOLD

var count = 0;
var latestTitle; // Need to store somewhere like redux or firebase
firebase.database().ref('events').limitToLast(1).on('child_added', (snapshot) => {
  // console.log('New Event!', snapshot.val() );

  // Notify new event,
  // IF Notification is permitted (granted),
  // IF Event author is not yourself,
  // IF the latest event was previously seen / loaded
  if (Notification.permission === 'granted' &&
      count > 0 &&
      latestTitle !== snapshot.val().title &&
      store.getState().users.uid !== snapshot.val().uid) {
    new Notification('Latest event info', {
      body: snapshot.val().title,
      icon: '../images/iconmonstr-info-6-64.png'
    });
  }

  count++;
  latestTitle = snapshot.val().title;
});

*****************/

render(
  <Provider store={ store }>
    { getRoutes(checkAuth, history) }
  </Provider>,
  document.getElementById('app')
);
