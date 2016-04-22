/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import roundTo from 'round-to';
import { GaussianFS } from './../..';
import { SetType, DataType } from './../../src/fuzzy-set/constants';

describe('Gaussian fuzzy set', () => {
  const fs = new GaussianFS(50, 20);

  it('MF has correct default properties', () => {
    expect(fs.mf.dimension).to.equal(1);
    expect(fs.mf.convex).to.be.true;
    expect(fs.mf.normal).to.be.true;
    expect(fs.mf.singleton).to.be.false;
    expect(fs.mf.isOpenLeft).to.be.false;
    expect(fs.mf.isOpenRight).to.be.false;
    expect(fs.mf.isClosed).to.be.true;
  });

  it('Universe has correct default properties', () => {
    expect(fs.universe.setType).to.equal(SetType.continuous);
    expect(fs.universe.dataType).to.equal(DataType.quantitative);
    expect(fs.universe.setInterval).to.equal('(-Infinity, Infinity)');
    expect(fs.universe.set).to.be.null;
  });

  it('has correct function values', () => {
    expect(fs.membershipGrade(50)).to.equal(1.0);
    expect(roundTo(fs.membershipGrade(0), 2)).to.equal(0.04);
    expect(roundTo(fs.membershipGrade(25), 2)).to.equal(0.46);
    expect(roundTo(fs.membershipGrade(70), 2)).to.equal(0.61);
  });

  it('has correct crossover points', () => {
    fs.mf.crossoverPoints.forEach((x) => expect(fs.membershipGrade(x)).to.equal(0.5));
  });

  it('has correct bandwidth', () => {
    expect(roundTo(fs.mf.bandwidth, 2)).to.equal(47.1);
  });

  it('has symmetry around correct point (b)', () => {
    const symmetricFs = new GaussianFS(10, 5);
    expect(symmetricFs.mf.isSymmetricAroundC(10.0)).to.be.true;
    expect(symmetricFs.mf.isSymmetricAroundC(2)).to.be.false;
  });

  it('throws error on invalid parameters', () => {
    const invalidFsCreation = () => new GaussianFS(0);
    const invalidFsCreation2 = () => new GaussianFS(0, 'as');

    expect(invalidFsCreation).to.throw(Error, 'Invalid gaussian parameters');
    expect(invalidFsCreation2).to.throw(Error);
  });
});
