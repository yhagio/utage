import React, { PropTypes } from 'react';
import { EventContainer } from 'containers';

const { string, func, number, bool, array } = PropTypes;

Events.propTypes = {
  filteredEvents: array.isRequired
};

export default function Events (props) {
  console.log('Filtered IDs', props.filteredEvents);
  return (
    <div>
      { props.filteredEvents.length === 0
        ? <h3>{ 'No event yet' }</h3>
        : null}
      
      { props.filteredEvents.map((id) => (
        <EventContainer
          eventId={ id }
          key= { id } />
      )) }
    </div>
  );
}
