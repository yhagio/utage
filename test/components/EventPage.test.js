import React from 'react';
import { List, Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import EventPage, { GoingCancelButton, DisplayDistance } from '../../src/components/EventPage/EventPage';

describe('Component: EventPage', () => {
  const latlng = Map({lat: '0123' , lng: '1223'});
  const handleConfirmAttendance = spy();
  const handleCancelAttendance = spy();
  const host = Map({
    uid: '12345',
    name: 'Yo Bro',
    photoURL : 'https://www.whateva.co.jp'
  });
  const event = Map({
    eventId: '123',
    title: 'Sample Title',
    description: 'Sample Desc',
    price: 10,
    category: 'Birthday',
    address: 'whatever 123 street',
    startDate: '2016-08-30T15:00',
    endDate: '2016-08-30T15:30'
  });
  
  it('should display loading message when fetching', () => {
    const wrapper = shallow(
      <EventPage
        authedUserID={ '123' }
        event={ Map({}) }
        eventHost={ host }
        eventLatLng={ latlng }
        isFetching={ true }
        error={ '' }
        rsvp={ false }
        going={ false}
        comments={ List([]) }
        attendance={ 0 }
        handleConfirmAttendance={ handleConfirmAttendance }
        handleCancelAttendance={ handleCancelAttendance }
        distanceCalculating={ false }
        distance={ 1000 } />
    );
    expect(wrapper.find('h2').text()).to.equal('Loading event');
  });

  it('should display event info', () => {
    const wrapper = shallow(
      <EventPage
        authedUserID={ '123' }
        event={ event }
        eventHost={ host }
        eventLatLng={ latlng }
        isFetching={ false }
        error={ '' }
        rsvp={ false }
        going={ false}
        comments={ List([]) }
        attendance={ 0 }
        handleConfirmAttendance={ handleConfirmAttendance }
        handleCancelAttendance={ handleCancelAttendance }
        distanceCalculating={ false }
        distance={ 1000 } />
    );
    expect(wrapper.find('h1').text()).to.equal('Sample Title');
  });
});

describe('Component: GoingCancelButton', () => {
  const handleConfirmAttendance = spy();
  const handleCancelAttendance = spy();
  
  it('displays "Cancel" button if already confirmed', ()=> {
    const wrapper = shallow(<GoingCancelButton going={true} eventId={ '123' }/>);
    expect(wrapper.text()).to.equal('Cancel');
  });

  it('displays "Cancel" button if already confirmed', ()=> {
    const wrapper = shallow(<GoingCancelButton going={true} eventId={ '123' } handleCancelAttendance={ handleCancelAttendance } />);
    wrapper.find('button').simulate('click');
    expect(handleCancelAttendance.calledWith('123')).to.be.true;
  });
  

  it('displays "Confirm Going" button if not responded yet', ()=> {
    const wrapper = shallow(<GoingCancelButton going={false} eventId={ '123' }/>);
    expect(wrapper.text()).to.equal('Confirm Going');
  });
  
  it('displays "Confirm Going" button if not responded yet', ()=> {
    const wrapper = shallow(<GoingCancelButton going={false} eventId={ '123' } handleConfirmAttendance={ handleConfirmAttendance } />);
    wrapper.find('button').simulate('click');
    expect(handleConfirmAttendance.calledWith('123')).to.be.true;
  });
});

describe('Component: DisplayDistance', () => {
  it('displays "Let me check" message if calculating', ()=> {
    const wrapper = shallow(<DisplayDistance distanceCalculating={true} distance={ 0 }/>);
    expect(wrapper.text()).to.equal('Distance: Let me check');
  });
  it('displays the calculated distance', ()=> {
    const wrapper = shallow(<DisplayDistance distanceCalculating={false} distance={ 109 }/>);
    expect(wrapper.text()).to.equal('Distance: 109 km');
  });
});