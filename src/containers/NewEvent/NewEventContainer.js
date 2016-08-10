import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { NewEvent } from 'components';
import * as actions from 'redux/modules/eventForm';

const { object, number, bool, string, func } = PropTypes;

const NewEventContainer = React.createClass({
  propTypes: {
    updateTitle: func.isRequired,
    updateDescription: func.isRequired,
    updateAddress: func.isRequired,
    updatePrice: func.isRequired,
    updateLimit: func.isRequired,
    updateStartDate: func.isRequired,
    updateEndDate: func.isRequired,
    title: string.isRequired,
    description: string.isRequired,
    address: string.isRequired,
    price: number.isRequired,
    limit: number.isRequired,
    startDate: string.isRequired,
    endDate: string.isRequired
  },
  
  render() {
    return (
      <NewEvent 
        updateTitle={ this.props.updateTitle }
        updateDescription={ this.props.updateDescription }
        updateAddress={ this.props.updateAddress }
        updatePrice={ this.props.updatePrice }
        updateLimit={ this.props.updateLimit }
        updateStartDate={ this.props.updateStartDate }
        updateEndDate={ this.props.updateEndDate }
        title={ this.props.title }
        description={ this.props.description }
        address={ this.props.address }
        price={ this.props.price }
        limit={ this.props.limit }
        startDate={ this.props.startDate }
        endDate={ this.props.endDate }
        error={ this.props.error } />
    );
  }
});


function mapStateToProps ({ eventForm }) {
  return {
    error: eventForm.error,
    title: eventForm.title,
    description: eventForm.description,
    address: eventForm.address,
    limit: eventForm.limit,
    price: eventForm.price,
    startDate: eventForm.startDate,
    endDate: eventForm.endDate
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEventContainer);