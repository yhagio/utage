import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EventEdit } from 'components';
import * as eventActions from 'redux/modules/event';

const { object, bool, string, func, array, number } = PropTypes;

const EventEditContainer = React.createClass({
  propTypes: {
    event: object.isRequired,
    eventHost: object.isRequired,
    isFetching: bool.isRequired,
    error: string.isRequired
  },
  
  render() {
    return <EventEdit
            event={ this.props.event }
            eventHost={ this.props.eventHost }
            isFetching={ this.props.isFetching }
            error={ this.props.error } />
  }
});


function mapStateToProps (state) {
  return {
    event: state.event.event,
    eventHost: state.event.eventHost,
    isFetching: state.event.isFetching,
    error: state.event.error
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(eventActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventEditContainer);