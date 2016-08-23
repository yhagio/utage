import React, { PropTypes } from 'react';
import { Map } from 'immutable';
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
    event: PropTypes.instanceOf(Map),
    eventId: PropTypes.string.isRequired
  },

  render () {    
    if (this.props.event && this.props.event.get('title')) {
      return (
        <Link to={ `events/${this.props.eventId}` } className={ innerBox }>
          <h2 className={ title }>{ this.props.event.get('title') }</h2>
          <p>{ limitText(this.props.event.get('description'), 160) }</p>
          <div className={ detail }>
            <p>
              <span className={ category }>{ this.props.event.get('category') }</span>
            </p>
            <p className={ date }>{ formatDateTime(this.props.event.get('startDate')) }</p>
            <p>{ this.props.event.get('price') === 0 ? 'FREE' : '$' + this.props.event.get('price') }</p>
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
    event: events.get('events').get(props.eventId)
  };
}

export default connect(
  mapStateToProps,
  null
)(EventContainer);
