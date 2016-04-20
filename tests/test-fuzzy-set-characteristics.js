/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import roundTo from 'round-to';
import { FuzzySet } from './..';
import isSupport from './../src/operations/is-support';
import isCore from './../src/operations/is-core';
import isCrossover from './../src/operations/is-crossover';
import isWithinAlphaLevelCut from './../src/operations/is-alpha-level-cut';
import isWithinStrongAlphaLevelCut from './../src/operations/is-strong-alpha-level-cut';

FuzzySet.prototype.isSupport = function support(...x) { return isSupport(this, ...x); };
FuzzySet.prototype.isCore = function core(...x) { return isCore(this, ...x); };
FuzzySet.prototype.isCrossover = function cross(...x) { return isCrossover(this, ...x); };
FuzzySet.prototype.isWithinAlphaLevelCut = function alphaLev(alpha, ...x) {
  return isWithinAlphaLevelCut(this, alpha, ...x);
};
FuzzySet.prototype.isWithinStrongAlphaLevelCut = function strongAlphaLev(alpha, ...x) {
  return isWithinStrongAlphaLevelCut(this, alpha, ...x);
};

describe('Fuzzy set member utilities test', () => {
  const fs = new FuzzySet({
    mf: { func: (x) => roundTo(Math.cos(x), 5) },
  });

  describe('Suppport', () => {
    it('is the set of members with grade greater than 0', () => {
      expect(isSupport(fs, 0)).to.be.true;
      expect(isSupport(fs, 0.9)).to.be.true;
      expect(isSupport(fs, Math.PI / 2.0)).to.be.false;

      expect(fs.isSupport(0)).to.be.true;
      expect(fs.isSupport(0.9)).to.be.true;
      expect(fs.isSupport(Math.PI / 2.0)).to.be.false;
    });
  });

  describe('Core', () => {
    it('is the set of members with grade equal 1', () => {
      expect(isCore(fs, 0)).to.be.true;
      expect(isCore(fs, 2.0 * Math.PI)).to.be.true;
      expect(isCore(fs, 1)).to.be.false;
      expect(isCore(fs, Math.PI)).to.be.false;

      expect(fs.isCore(0)).to.be.true;
      expect(fs.isCore(2.0 * Math.PI)).to.be.true;
      expect(fs.isCore(1)).to.be.false;
      expect(fs.isCore(Math.PI)).to.be.false;
    });
  });

  describe('Crossover point', () => {
    it('is the set of members with grade equal 0.5', () => {
      expect(isCrossover(fs, 3)).to.be.false;
      expect(isCrossover(fs, Math.acos(0.5))).to.be.true;

      expect(fs.isCrossover(3)).to.be.false;
      expect(fs.isCrossover(Math.acos(0.5))).to.be.true;
    });
  });

  describe('Alpha Cut', () => {
    it('is the set of members with grade greater than or equal an "alpha"', () => {
      expect(isWithinAlphaLevelCut(fs, 0.5, Math.acos(0.4))).to.be.false;
      expect(isWithinAlphaLevelCut(fs, 0.5, Math.acos(0.5))).to.be.true;
      expect(isWithinAlphaLevelCut(fs, 0.5, Math.acos(0.6))).to.be.true;

      expect(fs.isWithinAlphaLevelCut(0.5, Math.acos(0.4))).to.be.false;
      expect(fs.isWithinAlphaLevelCut(0.5, Math.acos(0.5))).to.be.true;
      expect(fs.isWithinAlphaLevelCut(0.5, Math.acos(0.6))).to.be.true;
    });
  });

  describe('Strong Alpha Cut', () => {
    it('is the set of members with grade greater than an "alpha"', () => {
      expect(isWithinStrongAlphaLevelCut(fs, 0.5, Math.acos(0.4))).to.be.false;
      expect(isWithinStrongAlphaLevelCut(fs, 0.5, Math.acos(0.5))).to.be.false;
      expect(isWithinStrongAlphaLevelCut(fs, 0.5, Math.acos(0.6))).to.be.true;

      expect(fs.isWithinStrongAlphaLevelCut(0.5, Math.acos(0.4))).to.be.false;
      expect(fs.isWithinStrongAlphaLevelCut(0.5, Math.acos(0.5))).to.be.false;
      expect(fs.isWithinStrongAlphaLevelCut(0.5, Math.acos(0.6))).to.be.true;
    });
  });
});
