/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import roundTo from 'round-to';
import { FuzzySet } from './../..';
import isWithinAlphaLevelCut from './../../src/operations/is-alpha-cut';

FuzzySet.prototype.isWithinAlphaLevelCut = function alphaLev(alpha, ...x) {
  return isWithinAlphaLevelCut(this, alpha, ...x);
};

describe('Alpha Cut', () => {
  const fs = new FuzzySet({ func: (x) => roundTo(Math.cos(x), 5) });

  it('is the set of members with grade greater than or equal an "alpha"', () => {
    expect(isWithinAlphaLevelCut(fs, 0.5, Math.acos(0.4))).to.be.false;
    expect(isWithinAlphaLevelCut(fs, 0.5, Math.acos(0.5))).to.be.true;
    expect(isWithinAlphaLevelCut(fs, 0.5, Math.acos(0.6))).to.be.true;

    expect(fs.isWithinAlphaLevelCut(0.5, Math.acos(0.4))).to.be.false;
    expect(fs.isWithinAlphaLevelCut(0.5, Math.acos(0.5))).to.be.true;
    expect(fs.isWithinAlphaLevelCut(0.5, Math.acos(0.6))).to.be.true;
  });
});
