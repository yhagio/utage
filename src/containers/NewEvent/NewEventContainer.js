import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { NewEvent } from 'components';
import * as actions from 'redux/modules/eventForm';

const { number, string, func, bool, object } = PropTypes;

const NewEventContainer = React.createClass({
  propTypes: {
    authedUser: object.isRequired,
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
        authedUser={ this.props.authedUser }
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
    authedUser: users.get('authedUser'),
    error: eventForm.get('error'),
    title: eventForm.get('title'),
    description: eventForm.get('description'),
    address: eventForm.get('address'),
    price: eventForm.get('price'),
    startDate: eventForm.get('startDate'),
    endDate: eventForm.get('endDate'),
    category: eventForm.get('category'),
    titleError: eventForm.get('titleError'),
    descriptionError: eventForm.get('descriptionError'),
    addressError: eventForm.get('addressError'),
    startDateError: eventForm.get('startDateError'),
    endDateError: eventForm.get('endDateError')
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEventContainer);
