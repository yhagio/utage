import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Nav } from 'components';
import * as userActionCreators from 'redux/modules/users';
import { firebaseAuth } from 'config/constants';
import { main } from './styles.css';

const MainContainer = React.createClass({
  propTypes: {
    isAuthenticated: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    stopFetchingUser: PropTypes.func.isRequired
  },

  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  componentDidMount() {
    // Check if user is already authenticated on initial load
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        // console.log('USER', user);
        let userInfo = {
          uid: user.providerData[0].uid,
          name: user.providerData[0].displayName,
          photoURL: user.providerData[0].photoURL
        };
        this.props.authUser(userInfo);
        this.props.fetchingUserSuccess(userInfo);
      } else {
        console.log('Stop fetching');
        this.props.stopFetchingUser();
      }
    });

    // Initialize Notification
    if ("Notification" in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      } else if (Notification.permission === 'granted') {
        console.log('Notification is permitted')
      } else {
        console.log('Notification is denied')
      }
    } else {
      console.log('Notification is not supported')
    }
  },

  clicked() {
    new Notification('Event detail updated', {
      body: 'The location has been changed due to an urgent issue at the building',
      icon: '../../images/iconmonstr-info-6-64.png'
    });
  },

  render() {
    return (
      <div className={ main }>
        <Nav isAuthenticated={ this.props.isAuthenticated }/>
        { this.props.children }
        <button onClick={ this.clicked }>Notify</button>
      </div>
    );
  }
});

function mapStateToProps (state) {
  return {
    isAuthenticated: state.users.isAuthenticated,
    isFetching: state.users.isFetching
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch);
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);