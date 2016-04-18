/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { FuzzySet, FuzzySetOperations } from './..';

describe('Fuzzy set operations', () => {
  const fs = new FuzzySet({
    mf: { func: (x) => Math.round(Math.cos(x)) },
  });

  const fs2 = new FuzzySet({
    mf: { func: () => 1.0 },
  });

  describe('Union', () => {
    it('is a set with the max grade between 2 fuzzy sets', () => {
      const unionFs = FuzzySetOperations.union(fs, fs2);

      expect(unionFs.membershipGrade(-Math.PI / 2.0)).to.equal(1.0);
      expect(unionFs.membershipGrade(0)).to.equal(1.0);
      expect(unionFs.membershipGrade(Math.PI / 2.0)).to.equal(1.0);
      expect(unionFs.membershipGrade(Math.PI)).to.equal(1.0);
    });
  });

  describe('Intersection', () => {
    it('is a set with the min grade between 2 fuzzy sets', () => {
      const intersectionFS = FuzzySetOperations.intersection(fs, fs2);

      expect(intersectionFS.membershipGrade(-Math.PI / 2.0)).to.equal(0);
      expect(intersectionFS.membershipGrade(0)).to.equal(1);
      expect(intersectionFS.membershipGrade(Math.PI / 2.0)).to.equal(0);
      expect(intersectionFS.membershipGrade(Math.PI)).to.equal(0);
    });
  });

  describe('Complement', () => {
    it('is a set with the complement [1 - f(x)] of the current set membership function', () => {
      const comlementFs = FuzzySetOperations.complement(fs);

      expect(comlementFs.membershipGrade(0)).to.equal(0);
      expect(comlementFs.membershipGrade(Math.PI / 2.0)).to.equal(1);
      expect(comlementFs.membershipGrade(Math.PI)).to.equal(1);
    });
  });
});
