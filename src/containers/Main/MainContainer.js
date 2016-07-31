import React, { PropTypes } from 'react';

const MainContainer = React.createClass({
  render() {
    return (
      <div>
        <h1>Main</h1>
        { this.props.children }
      </div>
    );
  }
});

export default MainContainer;