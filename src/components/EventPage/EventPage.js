import React, { PropTypes } from 'react';
import { Map, List } from 'immutable';
import { Link } from 'react-router';
// import { GoogleMap } from 'components';
import GoogleMap from '../GoogleMap/GoogleMap';
import {
  container,
  title,
  details,
  category,
  subInfo,
  host,
  description,
  mapArea,
  actionArea,
  actionButton,
  actionButtonNot,
  authorLink,
  editButton,
  dotdotdot
} from './styles.css';
import {
  formatDateTime
} from '../../helpers/utils';

const { string, func, bool, array, object, number } = PropTypes;

EventPage.propTypes = {
  authedUserID: string.isRequired,
  event: PropTypes.instanceOf(Map),
  eventHost: PropTypes.instanceOf(Map),
  eventLatLng: PropTypes.instanceOf(Map),
  isFetching: bool.isRequired,
  error: string.isRequired,
  rsvp: bool.isRequired,
  going: bool.isRequired,
  comments: PropTypes.instanceOf(List),
  attendance: number,
  handleConfirmAttendance: func.isRequired,
  handleCancelAttendance: func.isRequired,
  distanceCalculating: bool.isRequired,
  distance: number.isRequired
};

GoingCancelButton.propTypes = {
  eventId: string.isRequired,
  going: bool.isRequired
};

DisplayDistance.propTypes = {
  distanceCalculating: bool.isRequired,
  distance: number.isRequired
};

export function GoingCancelButton (props) {
  return props.going === true
    ? <button
        className={ actionButtonNot }
        onClick={ (e) => props.handleCancelAttendance(props.eventId, e) }
        role='button'>{ 'Cancel' }</button>
    : <button
        className={ actionButton }
        onClick={ (e) => props.handleConfirmAttendance(props.eventId, e) }
        role='button'>{ 'Confirm Going' }</button>;
}

export function DisplayDistance (props) {
  return props.distanceCalculating === true
    ? <p className={ dotdotdot }>Distance: Let me check</p>
    : <p>Distance: { props.distance !== 0 ? `${props.distance} km` : 'N/A' }</p>;
}

export default function EventPage (props) {
  return props.isFetching === true
    ? <h2 className={ dotdotdot }>Loading event</h2>
    : <div className={ container } >
        <h1 className={ title }>{ props.event.get('title') }</h1>

        <div className={ actionArea }>
          { props.authedUserID && props.event.get('eventId')
            ? <GoingCancelButton
              going={ props.going }
              eventId={ props.event.get('eventId') }
              handleConfirmAttendance={ props.handleConfirmAttendance }
              handleCancelAttendance={ props.handleCancelAttendance } />
            : null }

          { props.authedUserID === props.event.get('uid')
            ? <Link
              className={ editButton }
              to={ `events/${props.event.get('eventId')}/edit` }
              role='button'>
              { 'Edit Event' }
            </Link>
            : null }
        </div>

        <div className={ details } >
          <p className={ category }>{ props.event.get('category') }</p>
          <p>{ props.event.get('price') === 0 ? 'FREE' : '$' + props.event.get('price') }</p>
          <p>Going: <span>{ props.attendance }</span></p>
        </div>

        <div className={ subInfo } >
          <div className={ host }>
            <DisplayDistance
              distanceCalculating={ props.distanceCalculating }
              distance={ props.distance } />
            <p>Start: { formatDateTime(props.event.get('startDate')) }</p>
            posted by
            <Link
              className={ authorLink }
              to={ `events/${props.event.get('eventId')}` }
              role='link'>
              { props.eventHost.get('name') }
            </Link>
          </div>
          <p className={ description }>
            { props.event.get('description') }
          </p>
        </div>

        <div className={ mapArea }>
          <p>{ props.event.get('address') }</p>
          <GoogleMap
            eventLatLng={ props.eventLatLng } />
        </div>
      </div>;
}
