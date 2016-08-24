import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Nav, { Links } from '../../src/components/Nav/Nav';

describe('Component: Nav (when authenticated)', () => {
  it('has <nav>', () => {
    const wrapper = shallow(<Nav isAuthenticated={true} />);
    expect(wrapper.find('nav')).to.have.length(1);
  });

  it('has 4 <Link /> elements', () => {
    const wrapper = shallow(<Links isAuthenticated={true} />);
    expect(wrapper.find('Link')).to.have.length(4);
  });

  it('has <Link to="new-event" > ', () => {
    const wrapper = shallow(<Links isAuthenticated={true} />);
    expect(wrapper.find('Link').at(1).prop('to')).to.equal('new-event');
  });

  it('has <Link to="signout" > ', () => {
    const wrapper = shallow(<Links isAuthenticated={true} />);
    expect(wrapper.find('Link').at(2).prop('to')).to.equal('signout');
  });

  it('has <Link to="account" > ', () => {
    const wrapper = shallow(<Links isAuthenticated={true} />);
    expect(wrapper.find('Link').at(3).prop('to')).to.equal('account');
  });
  
});

describe('Component: Nav (when unauthenticated)', () => {
  it('has 2 <Link /> elements', () => {
    const wrapper = shallow(<Links isAuthenticated={false} />);
    expect(wrapper.find('Link')).to.have.length(2);
  });

  it('has <Link to="authenticate" > ', () => {
    const wrapper = shallow(<Links isAuthenticated={false} />);
    expect(wrapper.find('Link').at(1).prop('to')).to.equal('authenticate');
  });
});
