import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Signout from '../../src/components/Signout/Signout';

describe('Component: Signout', () => {
  it('does contains <div />', () => {
    const wrapper = shallow(<Signout />);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('does contains "You are now signed out" text', () => {
    const wrapper = shallow(<Signout />);
    expect(wrapper.text()).to.equal('You are now signed out');
  });
});