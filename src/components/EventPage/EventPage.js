import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { GoogleMap } from 'components';
import {
  container,
  title,
  details,
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
  timestamp
} from './styles.css';

const { string, func, bool, array, object } = PropTypes;

EventPage.propTypes = {
  event: object.isRequired,
  eventHost: object.isRequired,
  eventLatLng: object.isRequired,
  isFetching: bool.isRequired,
  error: string.isRequired,
  rsvp: bool.isRequired,
  going: bool.isRequired,
  comments: array.isRequired,
};

export default function EventPage (props) {  
  return props.isFetching === true
    ? <h3>Loading event data ...</h3>
    : (
      <div className={ container } >
        <h1 className={ title }>{ props.event.title }</h1>

        <div className={ actionArea }>
          <button
            className={ actionButton }
            role="button">I'm going</button>
          <button
            className={ actionButtonNot }
            role="button">Not going</button>
        </div>

        <div className={ details } >
          <p>{ props.event.price === 0 ? 'FREE' : '$'+props.event.price }</p>
          <p>Limit: { props.event.limit }</p>
          <p>Going: <span>23</span></p>
        </div>

        <div className={ subInfo } >
          <div className={ host }>
            <p>{ props.event.startDate }</p>
            Host:
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
