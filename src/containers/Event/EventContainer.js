import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  innerBox,
  title,
  detail,
  date,
  category
} from './styles.css';
import {
  limitText,
  formatDateTime
} from '../../helpers/utils';

const EventContainer = React.createClass({
  propTypes: {
    event: PropTypes.object.isRequired,
    eventId: PropTypes.string.isRequired
  },

  render () {
    if (this.props.event && this.props.event.title) {
      return (
        <Link to={ `events/${this.props.eventId}` } className={ innerBox }>
          <h2 className={ title }>{ this.props.event.title }</h2>
          <p>{ limitText(this.props.event.description, 160) }</p>
          <div className={ detail }>
            <p>
              <span className={ category }>{ this.props.event.category }</span>
            </p>
            <p className={ date }>{ formatDateTime(this.props.event.startDate) }</p>
            <p>{ this.props.event.price === 0 ? 'FREE' : '$' + this.props.event.price }</p>
          </div>
        </Link>
      );
    } else {
      return;
    }
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
