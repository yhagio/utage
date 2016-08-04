import React, { PropTypes } from 'react';
import GoogleMap from '../GoogleMap/GoogleMapContainer';
import {
  container,
  details,
  subInfo,
  description,
  mapArea,
  actionArea,
  conversations,
  singleConversation
} from './styles.css';

const EventPageContainer = React.createClass({
  render() {
    return (
      <div className={ container } >
        <h1>Jessica's Birthday Party</h1>

        <div className={ details } >
          <p>19:00 Aug 15, 2016</p>
          <p>FREE</p>
          <p>Going: <span>23</span></p>
        </div>

        <div className={ subInfo } >
          <p>Host: <span>Bob Smith</span></p>
          <p className={ description }>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
          </p>
          <div className={ mapArea }>

            <GoogleMap />

          </div>
        </div>

        <div className={ actionArea }>
          <button>Going</button>
        </div>

        <div>
          <h3>Conversations</h3>

          <div className={ conversations }>
            <ul>
              <li className={ singleConversation } >
                <div>
                  <p>
                    Hey, I'm gonna be late a lil bit since I'll be working til 9.
                  </p>
                  <a href="">
                    Alice Smith
                  </a>
                </div>
              </li>

              <li className={ singleConversation } >
                <div>
                  <p>
                    How many tequilla bottles should I prepare?
                  </p>
                  <a href="">
                    Kevin Soto
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    );
  }
});

export default EventPageContainer;