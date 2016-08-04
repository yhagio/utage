import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Main from '../containers/Main/MainContainer';
import Home from '../containers/Home/HomeContainer';
import Auth from '../containers/Auth/AuthContainer';
import EventPage from '../containers/EventPage/EventPageContainer';
import SignOut from '../containers/SignOut/SignOutContainer';
import NewEvent from '../containers/NewEvent/NewEventContainer';
import Account from '../containers/Account/AccountContainer';
import GoogleMap from '../containers/GoogleMap/GoogleMapContainer';

export default function getRoutes () {
  return (
    <Router history={ hashHistory }>
      <Route path='/' component={ Main }>
        <IndexRoute component={ Home } />
        <Route path='/authenticate' component={ Auth }/>
        <Route path='/account' component={ Account }/>
        <Route path='/events/:id' component={ EventPage }/>
        <Route path='/new-event' component={ NewEvent }/>
        <Route path='/map' component={ GoogleMap }/>
        <Route path='/signout' component={ SignOut }/>
        <Route path='*' component={ Home }/>
      </Route>
    </Router>
  );
}
