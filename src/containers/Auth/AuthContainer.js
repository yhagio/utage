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
    this.props.fetchAndHandleAuthedUser()
      .then(() => this.context.router.replace('/'));
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

function mapStateToProps (state) {
  return {
    isFetching: state.users.isFetching,
    error: state.users.error
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer);
