
import { expect } from 'chai';
import { MembershipFunction } from './..'

describe('Membership Function', () => {
  describe('Universe set', () => {
    it('has all the default properties', () => {
      const mf = new MembershipFunction({ func: () => 0 });

      expect(mf.universe).to.have.all.keys('setType', 'dataType', 'setInterval', 'set');
      expect(mf.universe.setType).to.be.null;
      expect(mf.universe.dataType).to.be.null;
      expect(mf.universe.setInterval).to.be.null;
      expect(mf.universe.set).to.be.null;
    });

    it('overrides the default properties properly', () => {
      const mf = new MembershipFunction({ func: () => 0 }, {
        setType: Symbol('discrete'),
        dataType: Symbol('qualitative'),
        setInterval: '(a, d)',
        set: ['a', 'b', 'c', 'd']
      });

      expect(mf.universe.setType.toString()).to.equal('Symbol(discrete)');
      expect(mf.universe.dataType.toString()).to.equal('Symbol(qualitative)');
      expect(mf.universe.setInterval).to.equal('(a, d)');
      expect(mf.universe.set).to.contain('a', 'b', 'c', 'd');
    });

    describe('Set type', () => {
      // TODO: test validations
    });
    
    describe('Data type', () => {
      // TODO: test validations
    });
    
    describe('Set interval', () => {
      // TODO: test validations and parsing
    });
    
    describe('Set', () => {
      // TODO: test validations
    });
  });
});
