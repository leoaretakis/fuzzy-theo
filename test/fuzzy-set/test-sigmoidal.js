/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import roundTo from 'round-to';
import { SigmoidalFS } from './../..';
import { SetType, DataType } from './../../src/fuzzy-set/constants';

describe('Sigmoidal fuzzy set', () => {
  const fs = new SigmoidalFS(50, 4);

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
    console.log('fs.membershipGrade(0)', fs.membershipGrade(0));
    expect(fs.membershipGrade(50)).to.equal(0.5);
    expect(Number(fs.membershipGrade(0).toFixed(2))).to.equal(0.0);
    expect(Number(fs.membershipGrade(25).toFixed(2))).to.equal(0.0);
    expect(Number(fs.membershipGrade(50.3).toFixed(2))).to.equal(0.77);
    expect(Number(fs.membershipGrade(70).toFixed(2))).to.equal(1);
  });

  it('has correct crossover points', () => {
    fs.mf.crossoverPoints.forEach((x) => expect(fs.membershipGrade(x)).to.equal(0.5));
  });

  it('has correct bandwidth', () => {
    expect(fs.mf.bandwidth).to.equal(0);
  });

  it('has symmetry around correct point (b)', () => {
    const symmetricFs = new SigmoidalFS(10, 5);
    expect(symmetricFs.mf.isSymmetricAroundC(Math.random())).to.be.false;
  });

  it('throws error on invalid parameters', () => {
    const invalidFsCreation = () => new SigmoidalFS(0);
    const invalidFsCreation2 = () => new SigmoidalFS(0, 'as');

    expect(invalidFsCreation).to.throw(Error, 'Invalid sigmoidal parameters');
    expect(invalidFsCreation2).to.throw(Error);
  });
});
