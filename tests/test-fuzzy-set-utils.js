/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import roundTo from 'round-to';
import { FuzzySet, FuzzySetUtils } from './..';

FuzzySet.prototype = Object.assign(FuzzySet.prototype, FuzzySetUtils);

describe('Fuzzy set member utilities test', () => {
  const fs = new FuzzySet((x) => roundTo(Math.cos(x), 5));
  it('throws an error if not called by a valid fuzzy set', () => {
    const expectedMsg = 'Utility function not composed by a valid fuzzy set';
    for (const funcName in FuzzySetUtils) {
      if ({}.hasOwnProperty(FuzzySetUtils, funcName)) {
        expect(FuzzySetUtils[funcName].bind(5)).to.throw(Error, expectedMsg);
      }
    }
  });
  describe('Suppport', () => {
    it('is the set of members with grade greater than 0', () => {
      expect(fs.isSupport(0)).to.be.true;
      expect(fs.isSupport(0.9)).to.be.true;
      expect(fs.isSupport(Math.PI / 2.0)).to.be.false;
    });
  });

  describe('Core', () => {
    it('is the set of members with grade equal 1', () => {
      expect(fs.isCore(0)).to.be.true;
      expect(fs.isCore(2.0 * Math.PI)).to.be.true;
      expect(fs.isCore(1)).to.be.false;
      expect(fs.isCore(Math.PI)).to.be.false;
    });
  });

  describe('Crossover point', () => {
    it('is the set of members with grade equal 0.5', () => {
      expect(fs.isCrossover(3)).to.be.false;
      expect(fs.isCrossover(Math.acos(0.5))).to.be.true;
    });
  });

  describe('Alpha Cut', () => {
    it('is the set of members with grade greater than or equal an "alpha"', () => {
      expect(fs.isWithinAlphaLevelCut(Math.acos(0.4), 0.5)).to.be.false;
      expect(fs.isWithinAlphaLevelCut(Math.acos(0.5), 0.5)).to.be.true;
      expect(fs.isWithinAlphaLevelCut(Math.acos(0.6), 0.5)).to.be.true;
    });
  });

  describe('Strong Alpha Cut', () => {
    it('is the set of members with grade greater than an "alpha"', () => {
      expect(fs.isWithinStrongAlphaLevelCut(Math.acos(0.4), 0.5)).to.be.false;
      expect(fs.isWithinStrongAlphaLevelCut(Math.acos(0.5), 0.5)).to.be.false;
      expect(fs.isWithinStrongAlphaLevelCut(Math.acos(0.6), 0.5)).to.be.true;
    });
  });
});
