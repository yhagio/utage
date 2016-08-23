import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as accountActions from 'redux/modules/account';
import * as usersActions from 'redux/modules/users';
import { Account } from 'components';
import { firebaseAuth } from 'config/constants';

const AccountContainer = React.createClass({
  propTypes: {
    authedUser: PropTypes.object.isRequired, //instanceOf(Map),
    isFetching: PropTypes.bool.isRequired,
    // error: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    checkNotificationEnabled: PropTypes.func.isRequired,
    handleUpdateNotification: PropTypes.func.isRequired,
  },

  componentDidMount () {
    this.props.checkNotificationEnabled();
  },

  render () {
    console.log(this.props.authedUser);
    return (
      <Account
        user={ this.props.authedUser }
        isFetching={ this.props.isFetching }
        error={ this.props.error }
        status={ this.props.status }
        handleUpdateNotification={ this.props.handleUpdateNotification } />
    );
  }
});

function mapStateToProps ({ account, users }) {
  return {
    status: account.get('status'),
    // error: account.get('error'),
    // isFetching: account.get('isFetching'),
    // user: account.get('user'),
    authedUser: users.get('authedUser'),
    isAuthenticated: users.get('isAuthenticated'),
    isFetching: users.get('isFetching')
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...accountActions,
    ...usersActions}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountContainer);
