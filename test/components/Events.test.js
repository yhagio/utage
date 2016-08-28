import React from 'react';
import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import Events from '../../src/components/Events/Events';

describe('Component: Events', () => {
  const fetchAndHandleEvents = spy();
  const filterEventsByCategory = spy();
  let obj = {};

  const event = {
    eventId: '123',
    title: 'Sample Title',
    description: 'Sample Desc',
    price: 10,
    category: 'Birthday',
    address: 'whatever 123 street',
    startDate: '2016-08-30T15:00',
    endDate: '2016-08-30T15:30',
    get(arg) { // Hack
      return this[arg]
    }
  };
  obj[event.eventId] = event;

  it('displays "Loading" when fetching', () => {
    const wrapper = shallow(<Events 
      filteredEvents={ Map(obj) }
      isFetching={ true }
      filterEventsByCategory={ filterEventsByCategory }
      error={ '' }
      searchCategory={ '' }
      events={ Map(obj) } >
    </Events>);
    expect(wrapper.find('h2').at(0).text()).to.equal('Loading');
  });

  it('displays "No event yet" when loaded with no events', () => {
    const wrapper = shallow(<Events 
      filteredEvents={ Map([]) }
      isFetching={ false }
      filterEventsByCategory={ filterEventsByCategory }
      error={ '' }
      searchCategory={ '' }
      events={ Map({}) } >
    </Events>);
    expect(wrapper.find('h2').at(0).text()).to.equal('No event yet');
  });

  it('displays events when loaded', () => {
    const wrapper = shallow(<Events 
      filteredEvents={ Map(obj) }
      isFetching={ false }
      filterEventsByCategory={ filterEventsByCategory }
      error={ '' }
      searchCategory={ 'Birthday' }
      events={ Map(obj) } >
    </Events>);
    expect(wrapper.find('Connect(EventContainer)').at(0).prop('eventId')).to.equal('123');
  });

  it('filterEventsByCategory is called when the selected value changes', () => {
    const wrapper = shallow(<Events 
      filteredEvents={ Map(obj) }
      isFetching={ false }
      filterEventsByCategory={ filterEventsByCategory }
      error={ '' }
      searchCategory={ '' }
      events={ Map(obj) } >
    </Events>);
    wrapper.find('#filterSelection').simulate('change', {target: {value: 'Birthday'}});
    expect(filterEventsByCategory.calledWith('Birthday')).to.be.true;
  });
});