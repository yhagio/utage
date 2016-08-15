import React, { PropTypes } from 'react';
import { EventContainer } from 'containers';
import {
  eventListBox,
  filter
} from './styles.css';

const { func, array } = PropTypes;

Events.propTypes = {
  filteredEvents: array.isRequired,
  filterEventsByCategory: func.isRequired
};

export default function Events (props) {
  // console.log('Filtered IDs', props.filteredEvents);
  return (
    <div className={ eventListBox }>
      <label htmlFor='filterSelection' >Category Filter</label><br/>
      <select
        id='filterSelection'
        name='filterSelection'
        className={ filter }
        value={ props.searchCategory }
        onChange={ (e) => props.filterEventsByCategory(e.target.value) } >

        <option value=''>ALL</option>
        <option value='Social'>Social</option>
        <option value='Birthday'>Birthday</option>
        <option value='Celebration'>Celebration</option>
        <option value='Networking'>Networking</option>
        <option value='Sports'>Sports</option>
        <option value='Conference'>Conference</option>

      </select>

      { props.filteredEvents.length === 0
        ? <h2><hr />No event yet</h2>
        : null }

      { props.filteredEvents.map((id) => (
        <EventContainer
          eventId={ id }
          key= { id } />
      )) }
    </div>
  );
}
