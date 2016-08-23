import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
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
    event: PropTypes.instanceOf(Map),
    eventHost: PropTypes.instanceOf(Map),
    eventLatLng: PropTypes.instanceOf(Map),
    isFetching: bool.isRequired,
    fetchAndHandleEvent: func.isRequired,
    error: string.isRequired,
    rsvp: bool.isRequired,
    going: bool.isRequired,
    comments: PropTypes.instanceOf(List),
    attendance: number,
    fetchEventAttendance: func.isRequired,
    handleConfirmAttendance: func.isRequired,
    handleCancelAttendance: func.isRequired,
    params: object.isRequired,
    distance: number.isRequired,
    distanceCalculating: bool.isRequired,
    calculateDistance: func.isRequired
  },

  componentDidMount () {
    // Let's calcualte the distance from your current location
    let self = this;
    navigator.geolocation.getCurrentPosition((position) => {
      if (position.coords.latitude &&
          position.coords.longitude &&
          self.props.eventLatLng.get('lat') &&
          self.props.eventLatLng.get('lng')) {

        self.props.calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            self.props.eventLatLng.get('lat'),
            self.props.eventLatLng.get('lng'));
      }
    }, (error) => {
      self.props.calculateDistance('Nop', 'Nop', self.props.eventLatLng.lat, self.props.eventLatLng.lng)
    });
    this.props.fetchAndHandleEvent(this.props.params.id);
    this.props.fetchEventAttendance(this.props.params.id);
  },

  render () {
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
            handleCancelAttendance={ this.props.handleCancelAttendance }
            distanceCalculating={ this.props.distanceCalculating }
            distance={ this.props.distance }/>;
  }
});

function mapStateToProps (state, ownProps) {
  return {
    authedUserID: state.users.authedUser.uid || '',
    event: state.event.get('event'),
    eventHost: state.event.get('eventHost'),
    eventLatLng: state.event.get('eventLatLng'),
    isFetching: state.event.get('isFetching'),
    error: state.event.get('error'),
    rsvp: state.event.get('rsvp'),
    comments: state.event.get('comments'),
    distanceCalculating: state.event.get('distanceCalculating'),
    distance: state.event.get('distance'),

    attendance: state.eventAttendance.get(ownProps.params.id),
    going: state.usersAttendance.get(ownProps.params.id) === true
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
