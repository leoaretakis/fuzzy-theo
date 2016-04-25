/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { LeftRightFS } from './../..';
import { SetType, DataType } from './../../src/fuzzy-set/constants';

describe('Sigmoidal fuzzy set', () => {
  const fs = new LeftRightFS(65, 60, 10);

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
    expect(fs.membershipGrade(65)).to.equal(1.0);
    expect(Number(fs.membershipGrade(0).toFixed(2))).to.equal(0.0);
    expect(Number(fs.membershipGrade(25).toFixed(2))).to.equal(0.75);
    expect(Number(fs.membershipGrade(50.3).toFixed(2))).to.equal(0.97);
    expect(Number(fs.membershipGrade(76).toFixed(2))).to.equal(0.26);
  });

  it('has correct crossover points', () => {
    fs.crossoverPoints.forEach((x) => {
      expect(Number(fs.membershipGrade(x).toFixed(2))).to.equal(0.5);
    });
  });

  it('has correct bandwidth', () => {
    expect(Number(fs.bandwidth.toFixed(2))).to.equal(60.81);
  });

  it('has symmetry around correct point (b)', () => {
    const symmetricFs = new LeftRightFS(10, 5, 1);
    expect(symmetricFs.isSymmetricAroundC(Math.random())).to.be.false;
  });

  it('throws error on invalid parameters', () => {
    const invalidFsCreation = () => new LeftRightFS(0);
    const invalidFsCreation2 = () => new LeftRightFS(0, 'as');

    expect(invalidFsCreation).to.throw(Error, 'Invalid left-right parameters');
    expect(invalidFsCreation2).to.throw(Error);
  });
});
