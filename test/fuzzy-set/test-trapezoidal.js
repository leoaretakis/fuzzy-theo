/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { TrapezoidalFS } from './../..';
import { SetType, DataType } from './../../src/fuzzy-set/constants';

describe('Trapezoidal fuzzy set', () => {
  const fs = new TrapezoidalFS(20, 40, 60, 80);

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
    expect(fs.membershipGrade(60)).to.equal(1.0);
    expect(fs.membershipGrade(50)).to.equal(1.0);
    expect(fs.membershipGrade(10)).to.equal(0.0);
    expect(fs.membershipGrade(30)).to.equal(0.5);
  });

  it('has correct crossover points', () => {
    fs.crossoverPoints.forEach((x) => expect(fs.membershipGrade(x)).to.equal(0.5));
  });

  it('has correct bandwidth', () => {
    expect(fs.bandwidth).to.equal(40);
  });

  it('has symmetry around correct point (b)', () => {
    const symmetricFs = new TrapezoidalFS(-10, -5, 5, 10);
    expect(symmetricFs.isSymmetricAroundC(0.0)).to.be.true;
    expect(symmetricFs.isSymmetricAroundC(10)).to.be.false;
  });

  it('throws error on invalid parameters', () => {
    const invalidFsCreation = () => new TrapezoidalFS(0, -10, 10);
    const invalidFsCreation2 = () => new TrapezoidalFS(0, 10);

    expect(invalidFsCreation).to.throw(Error, 'Invalid trapezoid parameters');
    expect(invalidFsCreation2).to.throw(Error);
  });
});
