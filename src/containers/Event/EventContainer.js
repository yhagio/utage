import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const { object, number, bool, string, func, array } = PropTypes;

const EventContainer = React.createClass({
  propTypes: {
    event: object.isRequired
  },

  render() {
    return (
      <Link to={ `events/${this.props.eventId}` }>
        <p>{ this.props.event.title }</p>
        <p>{ this.props.event.description }</p>
        <hr />
      </Link>
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