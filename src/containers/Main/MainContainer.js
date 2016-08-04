import React, { PropTypes } from 'react';

const MainContainer = React.createClass({
  render() {
    return (
      <div>
        <header>
          <nav>

          </nav>
        </header>
        { this.props.children }
      </div>
    );
  }
});

export default MainContainer;