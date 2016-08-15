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
  conversationArea,
  conversations,
  singleConversation,
  authorLink,
  comment,
  timestamp,
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

function GoingCancelButton (props) {
  return props.going === true
    ? <button
        className={ actionButtonNot }
        onClick={(e) => props.handleCancelAttendance(props.eventId, e)}
        role="button">{ 'Cancel' }</button>
    : <button
        className={ actionButton }
        onClick={(e) => props.handleConfirmAttendance(props.eventId, e)}
        role="button">{ 'Confirm Going' }</button>;
}

export default function EventPage (props) {  
  return props.isFetching === true
    ? <h3>Loading event data ...</h3>
    : (
      <div className={ container } >
        <h1 className={ title }>{ props.event.title }</h1>

        <div className={ actionArea }>
          { props.authedUserID
            ? <GoingCancelButton
              going={ props.going }
              eventId={ props.event.eventId }
              handleConfirmAttendance={ props.handleConfirmAttendance }
              handleCancelAttendance={ props.handleCancelAttendance }  />
            : null }
            
          { props.authedUserID === props.event.uid
            ? <Link
              className={ editButton }
              to={ `events/${ props.event.eventId }/edit` }
              role="button">
              { 'Edit Event' }
            </Link>
            : null }
        </div>

        <div className={ details } >
          <p className={ category }>{ props.event.category }</p>
          <p>{ props.event.price === 0 ? 'FREE' : '$'+props.event.price }</p>
          {/* <p>Limit: { props.event.limit }</p> */}
          <p>Going: <span>{ props.attendance }</span></p>
        </div>

        <div className={ subInfo } >
          <div className={ host }>
            <p>{ formatDateTime(props.event.startDate) }</p>
            posted by
            <Link
              className={ authorLink }
              to={ `events/${ props.event.eventId }` }
              role="link">
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

        {/* ===== ON HOLD =====
        <div className={ conversationArea }>
          <h2>Conversations</h2>

          <div className={ conversations }>
            <ul>
              <li className={ singleConversation } >
                <p className={ comment }>
                  Quas molestias excepturi sint occaecati cupiditate non provident. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.
                </p>
                <span className={ timestamp }>19:00 Aug 5, 2016</span>
                <a className={ authorLink } href="" role="link">
                  Alice Smith
                </a>
              </li>

              <li className={ singleConversation } >
                <p className={ comment }>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis!
                </p>
                <span className={ timestamp }>19:00 Aug 5, 2016</span>
                <a className={ authorLink } href="" role="link">
                  Kevin Soto
                </a>
              </li>

              <li className={ singleConversation } >
                <p className={ comment }>
                  Quas molestias excepturi sint occaecati cupiditate non provident. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.
                </p>
                <span className={ timestamp }>19:00 Aug 5, 2016</span>
                <a className={ authorLink } href="" role="link">
                  Alice Smith
                </a>
              </li>

            </ul>
          </div>

        </div>
        ===== ON HOLD ===== */}
      </div>
    );
}
