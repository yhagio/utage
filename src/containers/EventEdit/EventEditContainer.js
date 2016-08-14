import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { EventEdit } from 'components';
import * as eventEditActions from 'redux/modules/eventEdit';

const { object, bool, string, func, array, number } = PropTypes;

const EventEditContainer = React.createClass({
  propTypes: {
    event: object.isRequired,
    eventHost: object.isRequired,
    isFetching: bool.isRequired,
    error: string.isRequired,
    updateTitle: func.isRequired,
    updateDescription: func.isRequired,
    updateAddress: func.isRequired,
    updatePrice: func.isRequired,
    updateStartDate: func.isRequired,
    updateEndDate: func.isRequired,
    updateCategory: func.isRequired,
    title: string.isRequired,
    description: string.isRequired,
    address: string.isRequired,
    price: number.isRequired,
    startDate: string.isRequired,
    endDate: string.isRequired,
    category: string.isRequired,
    handleUpdateEvent: func.isRequired,
    handleDeleteEvent: func.isRequired
  },
  
  render() {
    return <EventEdit
            event={ this.props.event }
            eventHost={ this.props.eventHost }
            isFetching={ this.props.isFetching }
            error={ this.props.error }
            updateTitle={ this.props.updateTitle }
            updateDescription={ this.props.updateDescription }
            updateAddress={ this.props.updateAddress }
            updatePrice={ this.props.updatePrice }
            updateStartDate={ this.props.updateStartDate }
            updateEndDate={ this.props.updateEndDate }
            updateCategory={ this.props.updateCategory }
            title={ this.props.title }
            description={ this.props.description }
            address={ this.props.address }
            price={ this.props.price }
            startDate={ this.props.startDate }
            endDate={ this.props.endDate }
            category={ this.props.category }
            handleUpdateEvent={ this.props.handleUpdateEvent }
            handleDeleteEvent={ this.props.handleDeleteEvent } />
  }
});


function mapStateToProps (state) {
  return {
    event: state.event.event,
    eventHost: state.event.eventHost,
    isFetching: state.event.isFetching,
    error: state.event.error,
    title: state.eventEdit.title,
    description: state.eventEdit.description,
    address: state.eventEdit.address,
    price: state.eventEdit.price,
    startDate: state.eventEdit.startDate,
    endDate: state.eventEdit.endDate,
    category: state.eventEdit.category
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(eventEditActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventEditContainer);