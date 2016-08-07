import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from '../containers/Main/MainContainer';
import Events from '../containers/Events/EventsContainer';
import Auth from '../containers/Auth/AuthContainer';
import EventPage from '../containers/EventPage/EventPageContainer';
import SignOut from '../containers/SignOut/SignOutContainer';
import NewEvent from '../containers/NewEvent/NewEventContainer';
import Account from '../containers/Account/AccountContainer';

export default function getRoutes (checkAuth, history) {
  return (
    <Router history={ history }>
      <Route path='/' component={ Main }>
        <IndexRoute component={ Events } />
        <Route path='/authenticate' component={ Auth } onEnter={checkAuth} />
        <Route path='/account' component={ Account } onEnter={checkAuth} />
        <Route path='/events/:id' component={ EventPage }/>
        <Route path='/new-event' component={ NewEvent } onEnter={checkAuth} />
        <Route path='/signout' component={ SignOut }/>
        <Route path='*' component={ Events }/>
      </Route>
    </Router>
  );
}
