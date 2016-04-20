/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import roundTo from 'round-to';
import { FuzzySet } from './../..';
import isWithinStrongAlphaLevelCut from './../../src/operations/is-strong-alpha-cut';

FuzzySet.prototype.isWithinStrongAlphaLevelCut = function strongAlphaLev(alpha, ...x) {
  return isWithinStrongAlphaLevelCut(this, alpha, ...x);
};

describe('Strong Alpha Cut', () => {
  const fs = new FuzzySet({
    mf: { func: (x) => roundTo(Math.cos(x), 5) },
  });

  it('is the set of members with grade greater than an "alpha"', () => {
    expect(isWithinStrongAlphaLevelCut(fs, 0.5, Math.acos(0.4))).to.be.false;
    expect(isWithinStrongAlphaLevelCut(fs, 0.5, Math.acos(0.5))).to.be.false;
    expect(isWithinStrongAlphaLevelCut(fs, 0.5, Math.acos(0.6))).to.be.true;

    expect(fs.isWithinStrongAlphaLevelCut(0.5, Math.acos(0.4))).to.be.false;
    expect(fs.isWithinStrongAlphaLevelCut(0.5, Math.acos(0.5))).to.be.false;
    expect(fs.isWithinStrongAlphaLevelCut(0.5, Math.acos(0.6))).to.be.true;
  });
});
