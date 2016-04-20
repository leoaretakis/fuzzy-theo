/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { TriangularFS } from './../..';
import { SetType, DataType } from './../../src/fuzzy-set/constants';

describe('Triangular fuzzy set', () => {
  const fs = new TriangularFS(20, 60, 80);

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
    expect(fs.membershipGrade(60)).to.equal(1.0);
    expect(fs.membershipGrade(10)).to.equal(0.0);
    expect(fs.membershipGrade(50)).to.equal(0.75);
  });

  it('has correct crossover points', () => {
    fs.mf.crossoverPoints.forEach((x) => expect(fs.membershipGrade(x)).to.equal(0.5));
  });

  it('has correct bandwidth', () => {
    expect(fs.mf.bandwidth).to.equal(30);
  });

  it('has symmetry around correct point (b)', () => {
    const symmetricFs = new TriangularFS(-10, 0, 10);
    expect(symmetricFs.mf.isSymmetricAroundC(0)).to.be.true;
    expect(symmetricFs.mf.isSymmetricAroundC(10)).to.be.false;
  });

  it('throws error on invalid parameters', () => {
    const invalidFsCreation = () => new TriangularFS(0, -10, 10);
    const invalidFsCreation2 = () => new TriangularFS(0, 10);

    expect(invalidFsCreation).to.throw(Error, 'Invalid triangle parameters');
    expect(invalidFsCreation2).to.throw(Error);
  });
});
