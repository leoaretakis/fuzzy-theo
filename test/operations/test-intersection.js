/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { FuzzySet } from './../..';
import { intersection, union } from './../../src/operations/intersection_union';

describe('Basic operations', () => {
  const fs = new FuzzySet({ func: (x) => Math.round(Math.cos(x)) });
  const fs2 = new FuzzySet({ func: () => 1.0 });

  describe('Intersection', () => {
    it('is a set with the min grade between 2 fuzzy sets', () => {
      const intersectionFS = intersection(fs, fs2);

      expect(intersectionFS.membershipGrade(-Math.PI / 2.0)).to.equal(0);
      expect(intersectionFS.membershipGrade(0)).to.equal(1);
      expect(intersectionFS.membershipGrade(Math.PI / 2.0)).to.equal(0);
      expect(intersectionFS.membershipGrade(Math.PI)).to.equal(0);
    });
  });

  describe('Union', () => {
    it('is a set with the max grade between 2 fuzzy sets', () => {
      const unionFs = union(fs, fs2);

      expect(unionFs.membershipGrade(-Math.PI / 2.0)).to.equal(1.0);
      expect(unionFs.membershipGrade(0)).to.equal(1.0);
      expect(unionFs.membershipGrade(Math.PI / 2.0)).to.equal(1.0);
      expect(unionFs.membershipGrade(Math.PI)).to.equal(1.0);
    });
  });
});
