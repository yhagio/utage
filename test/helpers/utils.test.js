import { expect } from 'chai';
import * as utils from '../../src/helpers/utils';

describe('[Helpers] formatDateTime()', () => {
  it('returns the expected formatted date');
});

describe('[Helpers] limitText()', () => {
  it('returns the input as is if the text is within the limit');
  it('returns the modified text with ellipsis if it is over the limit');
});

describe('[Helpers] getDistanceFromLatLonInKm()', () => {
  it('return 0 if any of the input is not a number');
  it('return rounded km if the inputs are number');
});

describe('[Helpers] deg2rad()', () => {
  it('converts degree to radius');
});