/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import roundTo from 'round-to';
import { FuzzySet } from './../..';
import isCrossover from './../../src/operations/is-crossover';

FuzzySet.prototype.isCrossover = function cross(...x) { return isCrossover(this, ...x); };

describe('Crossover point', () => {
  const fs = new FuzzySet({ func: (x) => roundTo(Math.cos(x), 5) });

  it('is the set of members with grade equal 0.5', () => {
    expect(isCrossover(fs, 3)).to.be.false;
    expect(isCrossover(fs, Math.acos(0.5))).to.be.true;

    expect(fs.isCrossover(3)).to.be.false;
    expect(fs.isCrossover(Math.acos(0.5))).to.be.true;
  });
});
