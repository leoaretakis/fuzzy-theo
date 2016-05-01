/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { FuzzySet } from './../../src';

describe('Basic fuzzy set test', () => {
  it('must have a mf', () => {
    const expectedErrorMsg = 'Fuzzy set properties must have a mf';
    const case1ErrorThrowingFunction = () => new FuzzySet();
    const case2ErrorThrowingFunction = () => new FuzzySet({});
    const case3ErrorThrowingFunction = () => new FuzzySet({ func: null });
    const case4ErrorThrowingFunction = () => new FuzzySet({ func: {} });
    const case5CorrectFunction = () => new FuzzySet({ func: () => 1 });

    expect(case1ErrorThrowingFunction).to.throw(Error, expectedErrorMsg);
    expect(case2ErrorThrowingFunction).to.throw(Error, expectedErrorMsg);
    expect(case3ErrorThrowingFunction).to.throw(Error, expectedErrorMsg);
    expect(case4ErrorThrowingFunction).to.throw(Error, expectedErrorMsg);
    expect(case5CorrectFunction).not.to.throw(Error, expectedErrorMsg);
  });

  describe('Example: Cities you may choose to live in', () => {
    const mapMembershipGrades = {
      'San Francisco': 0.9,
      'Los Angeles': 0.6,
      Boston: 0.8,
      Amsterdam: 100,
      Chennai: -100,
      London: 'cloudy',
    };

    const fs = new FuzzySet({ func: (x) => mapMembershipGrades[x] });

    it('has correct membership grade for cities', () => {
      expect(fs.membershipGrade('San Francisco')).to.equal(0.9);
      expect(fs.membershipGrade('Boston')).to.equal(0.8);
      expect(fs.membershipGrade('Los Angeles')).to.equal(0.6);
    });

    it('has membership grade to be at most 1', () => {
      expect(fs.membershipGrade('Amsterdam')).to.be.at.most(1);
      expect(fs.membershipGrade('Amsterdam')).to.be.at.least(0);
    });

    it('has membership grade to be at least 0', () => {
      expect(fs.membershipGrade('Chennai')).to.be.at.most(1);
      expect(fs.membershipGrade('Chennai')).to.be.at.least(0);
    });

    it('has membership grade of unknown values as 0', () => {
      expect(fs.membershipGrade('any')).to.equal(0);
    });

    it('has grade always as a number', () => {
      expect(fs.membershipGrade('London')).to.be.a('number');
      expect(fs.membershipGrade('London')).not.to.be.NaN;
    });
  });

  describe('Universe set', () => {
    it('has all the default properties', () => {
      const fs = new FuzzySet({ func: (x) => x });

      expect(fs).to.have.any.keys('setType', 'dataType', 'setInterval', 'set');
      expect(fs.setType).to.be.null;
      expect(fs.dataType).to.be.null;
      expect(fs.setInterval).to.be.null;
      expect(fs.set).to.be.null;
    });

    it('overrides the default properties properly', () => {
      const fs = new FuzzySet({
        func: (x) => x,
        setType: Symbol.for('discrete'),
        dataType: Symbol.for('qualitative'),
        setInterval: '(a, d)',
        set: ['a', 'b', 'c', 'd'],
      });

      expect(fs.setType).to.equal(Symbol.for('discrete'));
      expect(fs.dataType).to.equal(Symbol.for('qualitative'));
      expect(fs.setInterval).to.equal('(a, d)');
      expect(fs.set).to.contain('a', 'b', 'c', 'd');
    });
  });

  describe('Membership Function', () => {
    it('has all the default properties', () => {
      const fs = new FuzzySet({ func: () => 0 });

      expect(fs).to.have.any.keys(
        'func', 'dimension', 'convex', 'normal', 'singleton', 'crossoverPoints',
        'isSymmetricAroundC', 'bandwidth', 'isOpenLeft', 'isOpenRight',
        'isClosed');
      expect(fs.func).to.not.be.null;
      expect(fs.dimension).to.equal(1);
      expect(fs.convex).to.be.false;
      expect(fs.normal).to.be.false;
      expect(fs.singleton).to.be.false;
      expect(fs.crossoverPoints).to.be.empty;
      expect(fs.isSymmetricAroundC).to.be.a('function');
      expect(fs.bandwidth).to.equal(0);
      expect(fs.isOpenLeft).to.be.false;
      expect(fs.isOpenRight).to.be.false;
      expect(fs.isClosed).to.be.false;
    });

    it('overrides the default properties properly', () => {
      const mfFun = (a) => a;
      const symFun = (a) => a;
      const fs = new FuzzySet({
        func: mfFun,
        convex: true,
        normal: false,
        singleton: false,
        crossoverPoints: [3, 10],
        isSymmetricAroundC: symFun,
        bandwidth: 7,
      });

      expect(fs.func).to.equal(mfFun);
      expect(fs.dimension).to.equal(1);
      expect(fs.convex).to.be.true;
      expect(fs.normal).to.be.false;
      expect(fs.singleton).to.be.false;
      expect(fs.crossoverPoints).to.deep.equal([3, 10]);
      expect(fs.isSymmetricAroundC).to.equal(symFun);
      expect(fs.bandwidth).to.equal(7);
      expect(fs.isOpenLeft).to.be.false;
      expect(fs.isOpenRight).to.be.false;
      expect(fs.isClosed).to.be.false;
    });
  });
});
