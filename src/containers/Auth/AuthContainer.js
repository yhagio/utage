import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Auth } from 'components';
import * as userActionCreators from 'redux/modules/users';

const AuthContainer = React.createClass({
  propTypes: {
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired
  },

  contextTypes: {
    router: PropTypes.object.isRequired
  },

  handleAuth (e) {
    e.preventDefault();
    this.props.fetchAndHandleAuthedUser();
  },

  render () {
    return (
      <div>
        <Auth
          onAuth={ this.handleAuth }
          isFetching={ this.props.isFetching }
          error={ this.props.error } />
      </div>
    );
  }
});

function mapStateToProps ({ users }) {
  return {
    isFetching: users.get('isFetching'),
    error: users.get('error')
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer);
