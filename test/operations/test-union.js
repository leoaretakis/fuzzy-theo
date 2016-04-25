/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { FuzzySet } from './../..';
import union from './../../src/operations/union';

describe('Union operation', () => {
  const fs = new FuzzySet({ func: (x) => Math.round(Math.cos(x)) });
  const fs2 = new FuzzySet({ func: () => 1.0 });

  it('is a set with the max grade between 2 fuzzy sets', () => {
    const unionFs = union(fs, fs2);

    expect(unionFs.membershipGrade(-Math.PI / 2.0)).to.equal(1.0);
    expect(unionFs.membershipGrade(0)).to.equal(1.0);
    expect(unionFs.membershipGrade(Math.PI / 2.0)).to.equal(1.0);
    expect(unionFs.membershipGrade(Math.PI)).to.equal(1.0);
  });
});
