import { describe, it } from 'mocha';
import { expect } from 'chai';
import { FuzzySet } from './..';

describe('Discrete test', () => {
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
      // eslint-disable-next-line no-unused-expressions
      expect(fs.membershipGrade('London')).not.to.be.NaN;
    });
  });
});
