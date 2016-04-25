/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { FuzzySet } from './../..';
import complement from './../../src/operations/complement';

describe('Complement operation', () => {
  const fs = new FuzzySet({ func: (x) => Math.round(Math.cos(x)) });

  it('is a set with the complement [1 - f(x)] of the current set membership function', () => {
    const comlementFs = complement(fs);

    expect(comlementFs.membershipGrade(0)).to.equal(0);
    expect(comlementFs.membershipGrade(Math.PI / 2.0)).to.equal(1);
    expect(comlementFs.membershipGrade(Math.PI)).to.equal(1);
  });
});
