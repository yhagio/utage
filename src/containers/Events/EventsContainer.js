import React, { PropTypes } from 'react';
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
    filteredEvents: array.isRequired,
    isFetching: bool.isRequired,
    filterEventsByCategory: func.isRequired,
    fetchAndHandleEvents: func.isRequired,
    error: string.isRequired,
    category: string.isRequired,
    events: object.isRequired
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

function mapStateToProps (state) {
  return {
    events: state.events.events,
    isFetching: state.events.isFetching,
    error: state.events.error,
    category: state.events.category,
    filteredEvents: state.events.filteredEvents
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsContainer);
