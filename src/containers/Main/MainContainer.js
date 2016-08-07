import React, { PropTypes } from 'react';
import Nav from '../Nav/NavContainer';
import { main } from './styles.css'

const MainContainer = React.createClass({
  render() {
    return (
      <div className={ main }>
        <Nav />
        { this.props.children }
      </div>
    );
  }
});

export default MainContainer;