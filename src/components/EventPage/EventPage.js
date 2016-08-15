import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { GoogleMap } from 'components';
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
  editButton
} from './styles.css';
import {
  formatDateTime
} from '../../helpers/utils';

const { string, func, bool, array, object, number } = PropTypes;

EventPage.propTypes = {
  authedUserID: string.isRequired,
  event: object.isRequired,
  eventHost: object.isRequired,
  eventLatLng: object.isRequired,
  isFetching: bool.isRequired,
  error: string.isRequired,
  rsvp: bool.isRequired,
  going: bool.isRequired,
  comments: array.isRequired,
  attendance: number,
  handleConfirmAttendance: func.isRequired,
  handleCancelAttendance: func.isRequired
};

GoingCancelButton.propTypes = {
  eventId: string.isRequired
};

function GoingCancelButton (props) {
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

export default function EventPage (props) {
  return props.isFetching === true
    ? <h3>Loading event data ...</h3>
    : <div className={ container } >
        <h1 className={ title }>{ props.event.title }</h1>

        <div className={ actionArea }>
          { props.authedUserID
            ? <GoingCancelButton
              going={ props.going }
              eventId={ props.event.eventId }
              handleConfirmAttendance={ props.handleConfirmAttendance }
              handleCancelAttendance={ props.handleCancelAttendance } />
            : null }

          { props.authedUserID === props.event.uid
            ? <Link
              className={ editButton }
              to={ `events/${props.event.eventId}/edit` }
              role='button'>
              { 'Edit Event' }
            </Link>
            : null }
        </div>

        <div className={ details } >
          <p className={ category }>{ props.event.category }</p>
          <p>{ props.event.price === 0 ? 'FREE' : '$' + props.event.price }</p>
          <p>Going: <span>{ props.attendance }</span></p>
        </div>

        <div className={ subInfo } >
          <div className={ host }>
            <p>{ formatDateTime(props.event.startDate) }</p>
            posted by
            <Link
              className={ authorLink }
              to={ `events/${props.event.eventId}` }
              role='link'>
              { props.eventHost.name }
            </Link>
          </div>
          <p className={ description }>
            { props.event.description }
          </p>
        </div>

        <div className={ mapArea }>
          <p>{ props.event.address }</p>
          <GoogleMap
            eventLatLng={ props.eventLatLng } />
        </div>
      </div>;
}
