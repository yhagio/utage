import React, { PropTypes } from 'react';
import { List, OrderedMap } from 'immutable';
import { EventContainer } from 'containers';
import {
  eventListBox,
  filter,
  dotdotdot
} from './styles.css';

const { bool, func, array } = PropTypes;

Events.propTypes = {
  isFetching: bool.isRequired,
  // filteredEvents: PropTypes.instanceOf(Map),
  filterEventsByCategory: func.isRequired
};

export default function Events (props) {
  // debugger;
  return props.isFetching === true
    ? <h2 className={ dotdotdot }>Loading</h2>
    : <div className={ eventListBox }>
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

      { props.filteredEvents.size === 0
        ? <h2><hr />No event yet</h2>
        : null }
      
      { props.filteredEvents.valueSeq().map((id) => (
        <EventContainer
          eventId={ id.get('eventId') }
          key= { id.get('eventId') } />
      )) }

    </div>;
}
