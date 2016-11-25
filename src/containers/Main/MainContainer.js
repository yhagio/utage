import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Nav } from 'components';
import * as userActionCreators from 'redux/modules/users';
import * as usersAttendanceActionCreators from 'redux/modules/usersAttendance';
import { firebaseAuth } from 'config/constants';
import { main, mainContent } from './styles.css';

const MainContainer = React.createClass({
  propTypes: {
    isAuthenticated: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    stopFetchingUser: PropTypes.func.isRequired,
    fetchUsersEventAttendance: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
  },

  componentDidMount () {
    // Check if user is already authenticated on initial load
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        let userInfo = {
          uid: user.providerData[0].uid,
          name: user.providerData[0].displayName,
          photoURL: user.providerData[0].photoURL
        };
        this.props.authUser(userInfo);
        this.props.fetchingUserSuccess(userInfo);
        this.props.fetchUsersEventAttendance();
      } else {
        this.props.stopFetchingUser();
      }
    });
  },

  render () {
    return (
      <div className={ main }>
        <Nav isAuthenticated={ this.props.isAuthenticated }/>
        <div className={ mainContent }>
          { this.props.children }
        </div>
      </div>
    );
  }
});

function mapStateToProps ({ users }) {
  return {
    isAuthenticated: users.get('isAuthenticated'),
    isFetching: users.get('isFetching')
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...userActionCreators,
    ...usersAttendanceActionCreators
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
