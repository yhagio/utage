import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EventPage } from 'components';
import * as eventActions from 'redux/modules/event';
import * as attendanceActions from 'redux/modules/eventAttendance';
import * as usersAttendanceActions from 'redux/modules/usersAttendance';

const { object, bool, string, func, array, number } = PropTypes;

const EventPageContainer = React.createClass({
  propTypes: {
    authedUserID: string.isRequired,
    event: object.isRequired,
    eventHost: object.isRequired,
    eventLatLng: object.isRequired,
    isFetching: bool.isRequired,
    fetchAndHandleEvent: func.isRequired,
    error: string.isRequired,
    rsvp: bool.isRequired,
    going: bool.isRequired,
    comments: array.isRequired,
    attendance: number,
    fetchEventAttendance: func.isRequired,
    // fetchUsersEventAttendance: func.isRequired,
    handleConfirmAttendance: func.isRequired,
    handleCancelAttendance: func.isRequired
  },

  componentDidMount() {
    this.props.fetchAndHandleEvent(this.props.params.id);
    this.props.fetchEventAttendance(this.props.params.id);
    // this.props.fetchUsersEventAttendance();
  },
  
  render() {
    return <EventPage
            authedUserID={ this.props.authedUserID }
            event={ this.props.event }
            eventHost={ this.props.eventHost }
            eventLatLng={ this.props.eventLatLng }
            isFetching={ this.props.isFetching }
            error={ this.props.error }
            rsvp={ this.props.rsvp }
            going={ this.props.going }
            comments={ this.props.comments }
            attendance={ this.props.attendance }
            handleConfirmAttendance={ this.props.handleConfirmAttendance }
            handleCancelAttendance={ this.props.handleCancelAttendance } />
  }
});


function mapStateToProps (state, ownProps) {
  return {
    authedUserID: state.users.authedUser.uid || '',
    event: state.event.event,
    eventHost: state.event.eventHost,
    eventLatLng: state.event.eventLatLng,
    isFetching: state.event.isFetching,
    error: state.event.error,
    rsvp: state.event.rsvp,
    comments: state.event.comments,
    attendance: state.eventAttendance[ownProps.params.id],
    going: state.usersAttendance[ownProps.params.id] === true
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...eventActions,
    ...attendanceActions,
    ...usersAttendanceActions
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPageContainer);