/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { MembershipFunction } from './..';

describe('Membership Function', () => {
  it('throws an error when no func is provided', () => {
    const expectedMsg = 'Membership function within the properties is mandatory';
    const invalidMFCreation = () => new MembershipFunction();

    expect(invalidMFCreation).to.throw(Error, expectedMsg);
  });

  describe('Properties', () => {
    it('has all the default properties', () => {
      const mf = new MembershipFunction({ func: () => 0 });

      expect(mf).to.have.all.keys(
        'func', 'dimension', 'convex', 'normal', 'singleton', 'crossoverPoints',
        'isSymmetricAroundC', 'bandwidth', 'isOpenLeft', 'isOpenRight',
        'isClosed');
      expect(mf.func).to.not.be.null;
      expect(mf.dimension).to.equal(1);
      expect(mf.convex).to.be.false;
      expect(mf.normal).to.be.false;
      expect(mf.singleton).to.be.false;
      expect(mf.crossoverPoints).to.be.empty;
      expect(mf.isSymmetricAroundC).to.be.a('function');
      expect(mf.bandwidth).to.equal(0);
      expect(mf.isOpenLeft).to.be.false;
      expect(mf.isOpenRight).to.be.false;
      expect(mf.isClosed).to.be.false;
    });

    it('overrides the default properties properly', () => {
      const mfFun = (a) => a;
      const symFun = (a) => a;
      const mf = new MembershipFunction({
        func: mfFun,
        convex: true,
        normal: false,
        singleton: false,
        crossoverPoints: [3, 10],
        isSymmetricAroundC: symFun,
        bandwidth: 7,
      });

      expect(mf.func).to.equal(mfFun);
      expect(mf.dimension).to.equal(1);
      expect(mf.convex).to.be.true;
      expect(mf.normal).to.be.false;
      expect(mf.singleton).to.be.false;
      expect(mf.crossoverPoints).to.deep.equal([3, 10]);
      expect(mf.isSymmetricAroundC).to.equal(symFun);
      expect(mf.bandwidth).to.equal(7);
      expect(mf.isOpenLeft).to.be.false;
      expect(mf.isOpenRight).to.be.false;
      expect(mf.isClosed).to.be.false;
    });
  });
});
