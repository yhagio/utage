import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import FacebookAuth from '../../src/components/FacebookAuth/FacebookAuth';

describe('Component: FacebookAuth', () => {
  const handleAuth = spy();

  it('should display "Sign in via facebook" when not fetching', () => {
    const wrapper = shallow(
      <FacebookAuth
        onAuth={ handleAuth }
        isFetching={ false } />
    );
    expect(wrapper.text()).to.equal('Sign in via facebook');
  });

  it('should display "Loading" when fetching', () => {
    const wrapper = shallow(
      <FacebookAuth
        onAuth={ handleAuth }
        isFetching={ true } />
    );
    expect(wrapper.text()).to.equal('Loading');
  });

  it('should call handleAuth on click', () => {
    const wrapper = shallow(
      <FacebookAuth
        onAuth={ handleAuth }
        isFetching={ false } />
    );
    expect(wrapper.simulate('click'));
    expect(handleAuth.calledOnce).to.be.true;
  });
});
