/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { FuzzySet } from './..';
import union from './../src/operations/union';
import intersection from './../src/operations/intersection';
import complement from './../src/operations/complement';
import { cartesianProduct, cartesianCoProduct } from './../src/operations/cartesian-product';

describe('Fuzzy set operations', () => {
  const fs = new FuzzySet({
    mf: { func: (x) => Math.round(Math.cos(x)) },
  });

  const fs2 = new FuzzySet({
    mf: { func: () => 1.0 },
  });

  describe('Merged MF properties', () => {
    // TODO
  });

  describe('Merged Universe properties', () => {
    // TODO
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

  describe('Intersection', () => {
    it('is a set with the min grade between 2 fuzzy sets', () => {
      const intersectionFS = intersection(fs, fs2);

      expect(intersectionFS.membershipGrade(-Math.PI / 2.0)).to.equal(0);
      expect(intersectionFS.membershipGrade(0)).to.equal(1);
      expect(intersectionFS.membershipGrade(Math.PI / 2.0)).to.equal(0);
      expect(intersectionFS.membershipGrade(Math.PI)).to.equal(0);
    });
  });

  describe('Complement', () => {
    it('is a set with the complement [1 - f(x)] of the current set membership function', () => {
      const comlementFs = complement(fs);

      expect(comlementFs.membershipGrade(0)).to.equal(0);
      expect(comlementFs.membershipGrade(Math.PI / 2.0)).to.equal(1);
      expect(comlementFs.membershipGrade(Math.PI)).to.equal(1);
    });
  });

  describe('Cartesian Product', () => {
    it('is a higher dimension set with the min grade between 2 fuzzy sets', () => {
      const cartProdFS = cartesianProduct(fs, fs2);

      expect(cartProdFS.membershipGrade(0, 1)).to.equal(1);
      expect(cartProdFS.membershipGrade(Math.PI / 2.0, 0)).to.equal(0);
    });
  });

  describe('Cartesian Co-Product', () => {
    it('is a higher dimension set with the max grade between 2 fuzzy sets', () => {
      const cartCoProdFS = cartesianCoProduct(fs, fs2);

      expect(cartCoProdFS.membershipGrade(0, 1)).to.equal(1);
      expect(cartCoProdFS.membershipGrade(Math.PI / 2.0, 0)).to.equal(1);
    });
  });
});
