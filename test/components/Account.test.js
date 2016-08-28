import React from 'react';
import { Map } from 'immutable';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import Account, { ToggleButton } from '../../src/components/Account/Account';

describe('Component: Account', () => {
  it('displays loading message when loading', () => {
    const wrapper = shallow(
      <Account 
        user={ {} }
        isFetching={ true }
        error={ '' }
        status={ '' }
        handleUpdateNotification={ spy() } />);
    expect(wrapper.find('h2').text()).to.equal('Fetching');
  });

  it('displays username when loaded', () => {
    const user = Map({
      name: 'Bobson Kayler'
    });
    const wrapper = shallow(
      <Account 
        user={ user }
        isFetching={ false }
        error={ '' }
        status={ '' }
        handleUpdateNotification={ spy() } />);
    expect(wrapper.find('p').text()).to.equal('Bobson Kayler'); 
  });
});

describe('Component: ToggleButton', () => {
  const requestPermission = spy();
  it('requestPermission is triggered when clicked', () => {
    window.Notifiaction = {};
    window.Notification = {};
    window.Notification.permission = 'default';

    const wrapper = mount(<ToggleButton requestPermission={ requestPermission }/>);
    expect(wrapper.find('button').simulate('click'));
    expect(requestPermission.calledOnce).to.be.true;
  });

  it('displays enabled message if Notification is enabled', () => {
    window.Notifiaction = {};
    window.Notification = {};
    window.Notification.permission = 'granted';

    const wrapper = mount(<ToggleButton requestPermission={ requestPermission }/>);
    expect(wrapper.find('p').text()).to.be.equal('Notification is enabled');
  });
  
  it('displays disabled message if Notification is denied', () => {
    window.Notifiaction = {};
    window.Notification = {};
    window.Notification.permission = 'denied';

    const wrapper = mount(<ToggleButton requestPermission={ requestPermission }/>);
    expect(wrapper.find('p').text()).to.be.equal('Notification is disabled');
  });
});