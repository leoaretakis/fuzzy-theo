/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import roundTo from 'round-to';
import { FuzzySet } from './../..';
import isCore from './../../src/operations/is-core';

FuzzySet.prototype.isCore = function core(...x) { return isCore(this, ...x); };

describe('Core', () => {
  const fs = new FuzzySet({
    mf: { func: (x) => roundTo(Math.cos(x), 5) },
  });

  it('is the set of members with grade equal 1', () => {
    expect(isCore(fs, 0)).to.be.true;
    expect(isCore(fs, 2.0 * Math.PI)).to.be.true;
    expect(isCore(fs, 1)).to.be.false;
    expect(isCore(fs, Math.PI)).to.be.false;

    expect(fs.isCore(0)).to.be.true;
    expect(fs.isCore(2.0 * Math.PI)).to.be.true;
    expect(fs.isCore(1)).to.be.false;
    expect(fs.isCore(Math.PI)).to.be.false;
  });
});
