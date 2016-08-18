import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { NewEvent } from 'components';
import * as actions from 'redux/modules/eventForm';

const { number, string, func, bool } = PropTypes;

const NewEventContainer = React.createClass({
  propTypes: {
    uid: string.isRequired,
    updateTitle: func.isRequired,
    updateDescription: func.isRequired,
    updateAddress: func.isRequired,
    updatePrice: func.isRequired,
    updateLimit: func.isRequired,
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
    createEvent: func.isRequired,
    error: string.isRequired,

    titleError: string.isRequired,
    warnTitleError: func.isRequired,
    descriptionError: string.isRequired,
    warnDescriptionError: func.isRequired,
    addressError: string.isRequired,
    warnAddressError: func.isRequired,
    startDateError: string.isRequired,
    warnStartDateError: func.isRequired,
    endDateError: string.isRequired,
    warnEndDateError: func.isRequired
  },

  render () {
    return (
      <NewEvent
        uid={ this.props.uid }
        updateTitle={ this.props.updateTitle }
        updateDescription={ this.props.updateDescription }
        updateAddress={ this.props.updateAddress }
        updatePrice={ this.props.updatePrice }
        updateLimit={ this.props.updateLimit }
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
        error={ this.props.error }
        createEvent={ this.props.createEvent }

        titleError={ this.props.titleError }
        warnTitleError={ this.props.warnTitleError } 
        descriptionError={ this.props.descriptionError }
        warnDescriptionError={ this.props.warnDescriptionError } 
        addressError={ this.props.addressError }
        warnAddressError={ this.props.warnAddressError }
        startDateError={ this.props.startDateError }
        warnStartDateError={ this.props.warnStartDateError }
        endDateError={ this.props.endDateError }
        warnEndDateError={ this.props.warnEndDateError }
        />
    );
  }
});

function mapStateToProps ({ eventForm, users }) {
  return {
    uid: users.authedUser.uid ? users.authedUser.uid : '',
    error: eventForm.error,
    title: eventForm.title,
    description: eventForm.description,
    address: eventForm.address,
    price: eventForm.price,
    startDate: eventForm.startDate,
    endDate: eventForm.endDate,
    category: eventForm.category,
    titleError: eventForm.titleError,
    descriptionError: eventForm.descriptionError,
    addressError: eventForm.addressError,
    startDateError: eventForm.startDateError,
    endDateError: eventForm.endDateError
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEventContainer);
