import React, { PropTypes } from 'react';

const HomeContainer = React.createClass({
  render() {
    return (
      <div>
        <h1>Events</h1>
        <ul>
          <li>
            <a href="" >
              <img src="" alt="Image" />
              <p>Tue, Aug 18 19:00</p>
              <p>Miah's Surprise Birthday</p>
              <p>213 St.John Street</p>
              <p>#birthday</p>
            </a>
            <hr />
            <a href="" >Share</a>
          </li>
        </ul>
      </div>
    );
  }
});

export default HomeContainer;