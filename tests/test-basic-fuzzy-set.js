/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { FuzzySet } from './..';

describe('Basic fuzzy set test', () => {
  describe('Cities you may choose to live in', () => {
    const mapMembershipGrades = {
      'San Francisco': 0.9,
      'Los Angeles': 0.6,
      Boston: 0.8,
      Amsterdam: 100,
      Chennai: -100,
      London: 'cloudy',
    };

    const fs = new FuzzySet((x) => mapMembershipGrades[x]);

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
      const fs = new FuzzySet((x) => x);

      expect(fs.universe).to.have.all.keys('setType', 'dataType', 'setInterval', 'set');
      expect(fs.universe.setType).to.be.null;
      expect(fs.universe.dataType).to.be.null;
      expect(fs.universe.setInterval).to.be.null;
      expect(fs.universe.set).to.be.null;
    });

    it('overrides the default properties properly', () => {
      const fs = new FuzzySet((x) => x, {
        setType: Symbol.for('discrete'),
        dataType: Symbol.for('qualitative'),
        setInterval: '(a, d)',
        set: ['a', 'b', 'c', 'd'],
      });

      expect(fs.universe.setType).to.equal(Symbol.for('discrete'));
      expect(fs.universe.dataType).to.equal(Symbol.for('qualitative'));
      expect(fs.universe.setInterval).to.equal('(a, d)');
      expect(fs.universe.set).to.contain('a', 'b', 'c', 'd');
    });
  });
});

describe('Continuous Test', () => {
  // TODO
});
