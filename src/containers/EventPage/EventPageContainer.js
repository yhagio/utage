import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EventPage } from 'components';
import * as actions from 'redux/modules/event';

const { object, bool, string, func, array } = PropTypes;

const EventPageContainer = React.createClass({
  propTypes: {
    event: object.isRequired,
    eventHost: object.isRequired,
    eventLatLng: object.isRequired,
    isFetching: bool.isRequired,
    fetchAndHandleEvent: func.isRequired,
    error: string.isRequired,
    rsvp: bool.isRequired,
    going: bool.isRequired,
    comments: array.isRequired,
  },

  componentDidMount() {
    this.props.fetchAndHandleEvent(this.props.params.id);
  },
  
  render() {
    return <EventPage
            event={ this.props.event }
            eventHost={ this.props.eventHost }
            eventLatLng={ this.props.eventLatLng }
            isFetching={ this.props.isFetching }
            error={ this.props.error }
            rsvp={ this.props.rsvp }
            going={ this.props.going }
            comments={ this.props.comments } />
  }
});


function mapStateToProps (state) {
  return {
    event: state.event.event,
    eventHost: state.event.eventHost,
    eventLatLng: state.event.eventLatLng,
    isFetching: state.event.isFetching,
    error: state.event.error,
    rsvp: state.event.rsvp,
    going: state.event.going,
    comments: state.event.comments
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPageContainer);