
import FuzzySet from './fuzzy-set';

function mergeMFProps(mf1, mf2) {
  return {
    dimension: Math.max(mf1.dimension, mf2.dimension),
    convex: mf1.convex && mf2.convex,
    normal: mf1.normal && mf2.normal,
    singleton: mf1.singleton && mf2.singleton,
  };
}

function unionMF(mf1, mf2) {
  return Object.assign({},
    { func: (...args) => Math.max(mf1.func.apply(this, args), mf2.func.apply(this, args)) },
    mergeMFProps(mf1, mf2));
}

function intersectMF(mf1, mf2) {
  return Object.assign({},
    { func: (...args) => Math.min(mf1.func.apply(this, args), mf2.func.apply(this, args)) },
    mergeMFProps(mf1, mf2));
}

function mergeSets(set1, set2, mergeMFFunc) {
  return new FuzzySet({
    mf: mergeMFFunc(set1.mf, set2.mf),
    universe: {
      setType: [set1.mf.setType, set2.mf.setType],
      dataType: [set1.mf.dataType, set2.mf.dataType],
      setInterval: [set1.mf.setInterval, set2.mf.setInterval],
      set: [set1.mf.set, set2.mf.set],
    },
  });
}


const fuzzySetOperations = {
  contains() {},

  union(fs1, fs2) {
    return mergeSets(fs1, fs2, unionMF);
  },

  intersection(fs1, fs2) {
    return mergeSets(fs1, fs2, intersectMF);
  },

  complement(fs) {
    const complementProps = Object.assign({}, fs);
    const func = complementProps.mf.func;
    complementProps.mf.func = (...args) => 1.0 - func.apply(fs, args);
    return new FuzzySet(complementProps);
  },

  cartesianProduct(fs1, fs2) {

  },

  cartesianCoProduct() {

  },
};

export default fuzzySetOperations;
