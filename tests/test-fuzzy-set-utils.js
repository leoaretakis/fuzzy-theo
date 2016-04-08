import { expect } from 'chai';
import roundTo from 'round-to';
import { FuzzySet, FuzzySetUtils } from './..';

FuzzySet.prototype = Object.assign(FuzzySet.prototype, FuzzySetUtils);

describe('Fuzzy set member utilities test', () => {

  const fs = new FuzzySet((x) => roundTo(Math.cos(x), 5));

  describe('Suppport', () => {
    it('is the set of members with grade greater than 0', () => {
      expect(fs.isSupport(0)).to.be.true;
      expect(fs.isSupport(0.9)).to.be.true;
      expect(fs.isSupport(Math.PI/2.0)).to.be.false;
    });

    it('throws an error if not called by a valid fuzzy set', () => {
      expect(FuzzySetUtils.isSupport.bind(5)).to.throw(Error, 'Utility function not composed by a valid fuzzy set');
    });
  });

  describe('Core', () => {
    it('is the set of members with grade equal 1', () => {
      expect(fs.isCore(0)).to.be.true;
      expect(fs.isCore(2.0 * Math.PI)).to.be.true;
      expect(fs.isCore(1)).to.be.false;
      expect(fs.isCore(Math.PI)).to.be.false;
    });

    it('throws an error if not called by a valid fuzzy set', () => {
      expect(FuzzySetUtils.isCore.bind(5)).to.throw(Error, 'Utility function not composed by a valid fuzzy set');
    });
  });
});