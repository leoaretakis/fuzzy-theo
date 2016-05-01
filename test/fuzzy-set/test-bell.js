/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import roundTo from 'round-to';
import { BellFS } from './../../src';
import { SetType, DataType } from './../../src/fuzzy-set/constants';

describe('Bell fuzzy set', () => {
  const fs = new BellFS(50, 4, 20);

  it('MF has correct default properties', () => {
    expect(fs.dimension).to.equal(1);
    expect(fs.convex).to.be.true;
    expect(fs.normal).to.be.true;
    expect(fs.singleton).to.be.false;
    expect(fs.isOpenLeft).to.be.false;
    expect(fs.isOpenRight).to.be.false;
    expect(fs.isClosed).to.be.true;
  });

  it('Universe has correct default properties', () => {
    expect(fs.setType).to.equal(SetType.continuous);
    expect(fs.dataType).to.equal(DataType.quantitative);
    expect(fs.setInterval).to.equal('(-Infinity, Infinity)');
    expect(fs.set).to.be.null;
  });

  it('has correct function values', () => {
    expect(fs.membershipGrade(50)).to.equal(1.0);
    expect(roundTo(fs.membershipGrade(0), 2)).to.equal(0.0);
    expect(roundTo(fs.membershipGrade(25), 2)).to.equal(0.14);
    expect(roundTo(fs.membershipGrade(70), 2)).to.equal(0.5);
  });

  it('has correct crossover points', () => {
    fs.crossoverPoints.forEach((x) => expect(fs.membershipGrade(x)).to.equal(0.5));
  });

  it('has correct bandwidth', () => {
    expect(fs.bandwidth).to.equal(40);
  });

  it('has symmetry around correct point (b)', () => {
    const symmetricFs = new BellFS(10, 5, 2);
    expect(symmetricFs.isSymmetricAroundC(10.0)).to.be.true;
    expect(symmetricFs.isSymmetricAroundC(2)).to.be.false;
  });

  it('throws error on invalid parameters', () => {
    const invalidFsCreation = () => new BellFS(0);
    const invalidFsCreation2 = () => new BellFS(0, 'as');

    expect(invalidFsCreation).to.throw(Error, 'Invalid bell parameters');
    expect(invalidFsCreation2).to.throw(Error);
  });
});
