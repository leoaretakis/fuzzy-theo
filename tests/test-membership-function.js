/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { FuzzySet } from './..';

describe('Membership Function', () => {
  describe('Properties', () => {
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
