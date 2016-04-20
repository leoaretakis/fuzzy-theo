/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { FuzzySet } from './../..';
import { cartesianProduct, cartesianCoProduct } from './../../src/operations/cartesian-product';

describe('Product operations', () => {
  const fs = new FuzzySet({
    mf: { func: (x) => Math.round(Math.cos(x)) },
  });

  const fs2 = new FuzzySet({
    mf: { func: () => 1.0 },
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
