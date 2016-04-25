/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import roundTo from 'round-to';
import { FuzzySet } from './../..';
import isSupport from './../../src/operations/is-support';

FuzzySet.prototype.isSupport = function support(...x) { return isSupport(this, ...x); };

describe('Suppport', () => {
  const fs = new FuzzySet({ func: (x) => roundTo(Math.cos(x), 5) });

  it('is the set of members with grade greater than 0', () => {
    expect(isSupport(fs, 0)).to.be.true;
    expect(isSupport(fs, 0.9)).to.be.true;
    expect(isSupport(fs, Math.PI / 2.0)).to.be.false;

    expect(fs.isSupport(0)).to.be.true;
    expect(fs.isSupport(0.9)).to.be.true;
    expect(fs.isSupport(Math.PI / 2.0)).to.be.false;
  });
});
