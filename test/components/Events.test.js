import React from 'react';
import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import Events from '../../src/components/Events/Events';
import EventContainer from '../../src/containers/Event/EventContainer';

describe('Component: Events', () => {
  it('displays "Loading" when fetching');
  it('displays events when loaded');
  it('displays "No event yet" when loaded with no events', () => {
    const fetchAndHandleEvents = spy();
    const filterEventsByCategory = spy();

    const wrapper = shallow(<Events 
      filteredEvents={ Map([]) }
      isFetching={ false }
      filterEventsByCategory={ filterEventsByCategory }
      fetchAndHandleEvents={ fetchAndHandleEvents }
      error={ '' }
      category={ '' }
      events={ {} } >
      </Events>);
    expect(wrapper.find('h2').at(0).text()).to.equal('No event yet');
  });
});