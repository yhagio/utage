import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  event
} from './styles.css';

const { object, number, bool, string, func, array } = PropTypes;

const EventContainer = React.createClass({
  propTypes: {
    event: object.isRequired
  },

  render() {
    return (
      <div className={ event }>
        <Link to={ `events/${this.props.eventId}` }>
          <h2>{ this.props.event.title }</h2>
          <p>{ this.props.event.startDate }</p>
          <p>{ this.props.event.price === 0 ? 'FREE' : '$'+this.props.event.price }</p>
        </Link>
      </div>
    );
  }
});

function mapStateToProps ({ events }, props) {
  return {
    event: events.events[props.eventId]
  };
}

export default connect(
  mapStateToProps,
  null
)(EventContainer);