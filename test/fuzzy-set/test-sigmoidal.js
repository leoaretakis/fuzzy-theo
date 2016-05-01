/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { SigmoidalFS } from './../../src';
import { SetType, DataType } from './../../src/fuzzy-set/constants';

describe('Sigmoidal fuzzy set', () => {
  const fs = new SigmoidalFS(50, 4);

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
    expect(fs.membershipGrade(50)).to.equal(0.5);
    expect(Number(fs.membershipGrade(0).toFixed(2))).to.equal(0.0);
    expect(Number(fs.membershipGrade(25).toFixed(2))).to.equal(0.0);
    expect(Number(fs.membershipGrade(50.3).toFixed(2))).to.equal(0.77);
    expect(Number(fs.membershipGrade(70).toFixed(2))).to.equal(1);
  });

  it('has correct crossover points', () => {
    fs.crossoverPoints.forEach((x) => expect(fs.membershipGrade(x)).to.equal(0.5));
  });

  it('has correct bandwidth', () => {
    expect(fs.bandwidth).to.equal(0);
  });

  it('has symmetry around correct point (b)', () => {
    const symmetricFs = new SigmoidalFS(10, 5);
    expect(symmetricFs.isSymmetricAroundC(Math.random())).to.be.false;
  });

  it('throws error on invalid parameters', () => {
    const invalidFsCreation = () => new SigmoidalFS(0);
    const invalidFsCreation2 = () => new SigmoidalFS(0, 'as');

    expect(invalidFsCreation).to.throw(Error, 'Invalid sigmoidal parameters');
    expect(invalidFsCreation2).to.throw(Error);
  });
});
