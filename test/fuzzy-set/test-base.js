/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { FuzzySet } from './../..';

describe('Basic fuzzy set test', () => {
  it('must have a mf', () => {
    const expectedErrorMsg = 'Fuzzy set properties must have a mf';
    const case1ErrorThrowingFunction = () => new FuzzySet();
    const case2ErrorThrowingFunction = () => new FuzzySet({});
    const case3ErrorThrowingFunction = () => new FuzzySet({ mf: null });
    const case4ErrorThrowingFunction = () => new FuzzySet({ mf: {} });
    const case5ErrorThrowingFunction = () => new FuzzySet({ mf: { func: null } });
    const case6ErrorThrowingFunction = () => new FuzzySet({ mf: { func: {} } });
    const case7CorrectFunction = () => new FuzzySet({ mf: { func: () => 1 } });

    expect(case1ErrorThrowingFunction).to.throw(Error, expectedErrorMsg);
    expect(case2ErrorThrowingFunction).to.throw(Error, expectedErrorMsg);
    expect(case3ErrorThrowingFunction).to.throw(Error, expectedErrorMsg);
    expect(case4ErrorThrowingFunction).to.throw(Error, expectedErrorMsg);
    expect(case5ErrorThrowingFunction).to.throw(Error, expectedErrorMsg);
    expect(case5ErrorThrowingFunction).to.throw(Error, expectedErrorMsg);
    expect(case6ErrorThrowingFunction).to.throw(Error, expectedErrorMsg);
    expect(case7CorrectFunction).not.to.throw(Error, expectedErrorMsg);
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

    const fs = new FuzzySet({
      mf: { func: (x) => mapMembershipGrades[x] },
    });

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
      const fs = new FuzzySet({ mf: { func: (x) => x } });

      expect(fs.universe).to.have.all.keys('setType', 'dataType', 'setInterval', 'set');
      expect(fs.universe.setType).to.be.null;
      expect(fs.universe.dataType).to.be.null;
      expect(fs.universe.setInterval).to.be.null;
      expect(fs.universe.set).to.be.null;
    });

    it('overrides the default properties properly', () => {
      const fs = new FuzzySet({
        mf: { func: (x) => x },
        universe: {
          setType: Symbol.for('discrete'),
          dataType: Symbol.for('qualitative'),
          setInterval: '(a, d)',
          set: ['a', 'b', 'c', 'd'],
        },
      });

      expect(fs.universe.setType).to.equal(Symbol.for('discrete'));
      expect(fs.universe.dataType).to.equal(Symbol.for('qualitative'));
      expect(fs.universe.setInterval).to.equal('(a, d)');
      expect(fs.universe.set).to.contain('a', 'b', 'c', 'd');
    });
  });

  describe('Membership Function', () => {
    it('has all the default properties', () => {
      const fs = new FuzzySet({ mf: { func: () => 0 } });

      expect(fs.mf).to.have.all.keys(
        'func', 'dimension', 'convex', 'normal', 'singleton', 'crossoverPoints',
        'isSymmetricAroundC', 'bandwidth', 'isOpenLeft', 'isOpenRight',
        'isClosed');
      expect(fs.mf.func).to.not.be.null;
      expect(fs.mf.dimension).to.equal(1);
      expect(fs.mf.convex).to.be.false;
      expect(fs.mf.normal).to.be.false;
      expect(fs.mf.singleton).to.be.false;
      expect(fs.mf.crossoverPoints).to.be.empty;
      expect(fs.mf.isSymmetricAroundC).to.be.a('function');
      expect(fs.mf.bandwidth).to.equal(0);
      expect(fs.mf.isOpenLeft).to.be.false;
      expect(fs.mf.isOpenRight).to.be.false;
      expect(fs.mf.isClosed).to.be.false;
    });

    it('overrides the default properties properly', () => {
      const mfFun = (a) => a;
      const symFun = (a) => a;
      const fs = new FuzzySet({
        mf: {
          func: mfFun,
          convex: true,
          normal: false,
          singleton: false,
          crossoverPoints: [3, 10],
          isSymmetricAroundC: symFun,
          bandwidth: 7,
        },
      });

      expect(fs.mf.func).to.equal(mfFun);
      expect(fs.mf.dimension).to.equal(1);
      expect(fs.mf.convex).to.be.true;
      expect(fs.mf.normal).to.be.false;
      expect(fs.mf.singleton).to.be.false;
      expect(fs.mf.crossoverPoints).to.deep.equal([3, 10]);
      expect(fs.mf.isSymmetricAroundC).to.equal(symFun);
      expect(fs.mf.bandwidth).to.equal(7);
      expect(fs.mf.isOpenLeft).to.be.false;
      expect(fs.mf.isOpenRight).to.be.false;
      expect(fs.mf.isClosed).to.be.false;
    });
  });
});
