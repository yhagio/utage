import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
// import Events from '../../src/components/Events/Events';
// import EventContainer from '../../src/containers/Event/EventContainer';

describe('Component: Events', () => {
  it('displays "Loading" when fetching');
  it('displays events when not fetching');
  // it('displays "Loading" when fetching', () => {
  //   const fetchAndHandleEvents = spy();
  //   const filterEventsByCategory = spy();

  //   const wrapper = mount(<Events 
  //     filteredEvents={ [] }
  //     isFetching={ false }
  //     filterEventsByCategory={ filterEventsByCategory }
  //     fetchAndHandleEvents={ fetchAndHandleEvents }
  //     error={ '' }
  //     category={ '' }
  //     events={ {} } >
  //     </Events>);
  //   expect(wrapper.find('h2').at(0).text()).to.equal('Loading');
  // });
});