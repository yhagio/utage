import React from 'react';
import { Map } from 'immutable';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import EventEdit from '../../src/components/EventEdit/EventEdit';

describe('Component: EventEdit', () => {
  it('displays the correct page');
  it('displays loading message when it is loading');
  it('update the title');
  it('warns if the title is empty');
  it('update the description');
  it('warns if the description is empty');
  it('update the price');
  it('update the address');
  it('warns if the address is empty');
  it('update the startDate');
  it('warns if the startDate is empty');
  it('update the endDate');
  it('warns if the endDate is empty');
  it('update the category');
  it('can update if all fields are filled');
  it('can delete on clicking delete button');
});

describe('Component: SubmitButton', () => {
  it('if errors, cannot update');
  it('if no errors, can update');
});