import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Events } from 'components';
import * as actions from 'redux/modules/events';

import {
  container
} from './styles.css';

const { object, bool, string, func, array } = PropTypes;

const EventsContainer = React.createClass({
  propTypes: {
    // filteredEvents: PropTypes.instanceOf(Map),
    isFetching: bool.isRequired,
    filterEventsByCategory: func.isRequired,
    fetchAndHandleEvents: func.isRequired,
    error: string.isRequired,
    category: string.isRequired,
    events: PropTypes.instanceOf(Map)
  },

  componentDidMount () {
    this.props.fetchAndHandleEvents();
  },

  render () {
    return (
      <div className={ container }>
        <h1>Events</h1>
        <Events
          events={ this.props.events }
          filteredEvents={ this.props.filteredEvents }
          error={ this.props.error }
          isFetching={ this.props.isFetching }
          category={ this.props.category }
          filterEventsByCategory={ this.props.filterEventsByCategory } />
      </div>
    );
  }
});

function mapStateToProps ({ events }) {
  return {
    events: events.get('events'),
    isFetching: events.get('isFetching'),
    error: events.get('error'),
    category: events.get('category'),
    filteredEvents: events.get('filteredEvents')
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsContainer);
