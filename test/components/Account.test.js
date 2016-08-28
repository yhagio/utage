import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Account from '../../src/components/Account/Account';

describe('Component: Account', () => {
  it('displays laoding message when loading');
  it('displays username when loaded');
});

describe('Component: ToggleButton', () => {
  it('requestPermission is triggered when clicked');
  it('displays granted message if Notification is permitted');
  it('displays disabled message if Notification is denied');
  it('displays Notification unsupported message if not supported');
});