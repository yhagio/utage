import React, { PropTypes } from 'react';
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

const EventPageContainer = React.createClass({
  render() {
    return (
      <div className={ container } >
        <h1 className={ title }>Jessica's Birthday Party</h1>

        <div className={ actionArea }>
          <button
            className={ actionButton }
            role="button">I'm going</button>
          <button
            className={ actionButtonNot }
            role="button">Not going</button>
        </div>

        <div className={ details } >
          <p>19:00 Aug 15, 2016</p>
          <p>FREE</p>
          <p>Going: <span>23</span></p>
        </div>

        <div className={ subInfo } >
          <p className={ host }>Host: <a className={ authorLink} href="" role="link">Bob Smith</a></p>
          <p className={ description }>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
          </p>
        </div>

        <div className={ mapArea }>
          <GoogleMap />
        </div>

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
      </div>
    );
  }
});

export default EventPageContainer;