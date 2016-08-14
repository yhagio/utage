import React, { PropTypes } from 'react';
import { EventContainer } from 'containers';

const { string, func, number, bool, array } = PropTypes;

Events.propTypes = {
  filteredEvents: array.isRequired,
  filterEventsByCategory: func.isRequired
};

export default function Events (props) {
  // console.log('Filtered IDs', props.filteredEvents);
  return (
    <div>
      { props.filteredEvents.length === 0
        ? <h3>{ 'No event yet' }</h3>
        : null}

      <label htmlFor="filterSelection" className="" >Category Filter</label>
      <select
        id="filterSelection"
        name="filterSelection"
        value={ props.searchCategory }
        onChange={ (e) => props.filterEventsByCategory(e.target.value) } >

        <option value=''>Select ▼</option>
        <option value='Social'>Social</option>
        <option value='Birthday'>Birthday</option>
        <option value='Celebration'>Celebration</option>
        <option value='Networking'>Networking</option>
        <option value='Sports'>Sports</option>
        <option value='Conference'>Conference</option>

      </select>
      
      { props.filteredEvents.map((id) => (
        <EventContainer
          eventId={ id }
          key= { id } />
      )) }
    </div>
  );
}
