import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
// import Main from '../containers/Main/MainContainer';
// import Events from '../containers/Events/EventsContainer';
// import Auth from '../containers/Auth/AuthContainer';
// import EventPage from '../containers/EventPage/EventPageContainer';
// import SignOut from '../containers/SignOut/SignOutContainer';
// import NewEvent from '../containers/NewEvent/NewEventContainer';
// import Account from '../containers/Account/AccountContainer';

import {
  MainContainer,
  EventsContainer,
  EventContainer,
  EventPageContainer,
  NewEventContainer,
  SignOutContainer,
  AuthContainer,
  AccountContainer,
  EventEditContainer
} from 'containers';

export default function getRoutes (checkAuth, history) {
  return (
    <Router history={ history }>
      <Route path='/' component={ MainContainer }>
        <IndexRoute component={ EventsContainer } />
        <Route path='/authenticate' component={ AuthContainer } onEnter={checkAuth} />
        <Route path='/account' component={ AccountContainer } onEnter={checkAuth} />
        <Route path='/events/:id' component={ EventPageContainer } />
        <Route path='/events/:id/edit' component={ EventEditContainer } onEnter={checkAuth} />
        <Route path='/new-event' component={ NewEventContainer } onEnter={checkAuth} />
        <Route path='/signout' component={ SignOutContainer } />
        <Route path='*' component={ EventsContainer } />
      </Route>
    </Router>
  );
}
