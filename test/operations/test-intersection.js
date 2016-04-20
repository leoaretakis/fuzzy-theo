/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { FuzzySet } from './../..';
import intersection from './../../src/operations/intersection';

describe('Intersection operation', () => {
  const fs = new FuzzySet({
    mf: { func: (x) => Math.round(Math.cos(x)) },
  });

  const fs2 = new FuzzySet({
    mf: { func: () => 1.0 },
  });

  it('is a set with the min grade between 2 fuzzy sets', () => {
    const intersectionFS = intersection(fs, fs2);

    expect(intersectionFS.membershipGrade(-Math.PI / 2.0)).to.equal(0);
    expect(intersectionFS.membershipGrade(0)).to.equal(1);
    expect(intersectionFS.membershipGrade(Math.PI / 2.0)).to.equal(0);
    expect(intersectionFS.membershipGrade(Math.PI)).to.equal(0);
  });
});
