import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signoutAndUnauth } from 'redux/modules/users';
import { Signout } from 'components';

const SignOutContainer = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired
  },

  componentDidMount () {
    this.props.dispatch(signoutAndUnauth());
  },

  render () {
    return <Signout />;
  }
});

export default connect()(SignOutContainer);
