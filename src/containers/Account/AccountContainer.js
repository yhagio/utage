import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as accountActions from 'redux/modules/account';
import { Account } from 'components';

const AccountContainer = React.createClass({
  propTypes: {
    status: PropTypes.string.isRequired,
    checkNotificationEnabled: PropTypes.func.isRequired,
    handleUpdateNotification: PropTypes.func.isRequired
  },

  componentDidMount () {
    this.props.checkNotificationEnabled();
  },

  render () {
    return (
      <Account
        status={ this.props.status }
        handleUpdateNotification={ this.props.handleUpdateNotification } />
    );
  }
});

function mapStateToProps (state) {
  return {
    status: state.account.status
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(accountActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountContainer);
