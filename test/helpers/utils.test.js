import { expect } from 'chai';
import * as utils from '../../src/helpers/utils';

describe('[Helpers] formatDateTime()', () => {
  it('returns the expected formatted date', () => {
    expect(utils.formatDateTime('2016-09-01T18:00')).to.be.equal('Sep 01, 2016, 6:00 PM');
  });
});

describe('[Helpers] limitText()', () => {
  it('returns the input as is if the text is within the limit', () => {
    expect(utils.limitText('Lorem ipsum dolor sit amet', 160)).to.be.equal('Lorem ipsum dolor sit amet')
  });

  it('returns the modified text with ellipsis if it is over the limit', () => {
    expect(utils.limitText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 160)).to.be.equal('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nos...')
  });
});

describe('[Helpers] getDistanceFromLatLonInKm()', () => {
  it('return 0 if any of the input is not a number', () => {
    expect(utils.getDistanceFromLatLonInKm(324, 'sdf', 0, 'fd')).to.be.equal(0);
  });

  it('return rounded km if the inputs are number', () => {
    expect(utils.getDistanceFromLatLonInKm(37.1190309, -8.537262000000055, 45.585152099999995, -73.5555807)).to.be.equal(5358);
  });
});
