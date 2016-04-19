
import FuzzySet from './fuzzy-set';

function mergeBasicMfProps(mf1, mf2) {
  return {
    dimension: Math.max(mf1.dimension, mf2.dimension),
    convex: mf1.convex && mf2.convex,
    normal: mf1.normal && mf2.normal,
    singleton: mf1.singleton && mf2.singleton,
  };
}

function mergeBasicUniverseProps(u1, u2) {
  return {
    setType: [u1.setType, u2.setType],
    dataType: [u1.dataType, u2.dataType],
    setInterval: [u1.setInterval, u2.setInterval],
    set: [u1.set, u2.set],
  };
}

function mergeMFSingleParam(aggregateFun, mf1, mf2) {
  return Object.assign(
    mergeBasicMfProps(mf1, mf2),
    { func: (...args) => aggregateFun(mf1.func.apply(this, args), mf2.func.apply(this, args)) }
  );
}

function mergeMFMultiParam(aggregateFun, mf1, mf2) {
  return Object.assign(
    mergeBasicMfProps(mf1, mf2), {
      func(...args) {
        return aggregateFun(mf1.func.apply(this, args),
                            mf2.func.apply(this, args.slice(mf1.dimension)));
      },
    }
  );
}

function mergeSets(set1, set2, mergeMFFunc) {
  return new FuzzySet({
    mf: mergeMFFunc(set1.mf, set2.mf),
    universe: mergeBasicUniverseProps(set1.universe, set2.universe),
  });
}


const fuzzySetOperations = {
  contains() {
    // TODO
  },

  union(fs1, fs2) {
    return mergeSets(fs1, fs2, mergeMFSingleParam.bind(null, Math.max));
  },

  intersection(fs1, fs2) {
    return mergeSets(fs1, fs2, mergeMFSingleParam.bind(null, Math.min));
  },

  complement(fs) {
    const complementFunc = (...args) => 1.0 - fs.mf.func.apply(fs.mf, args);
    const complementMFProps = Object.assign({},
      fs.mf,
      { func: complementFunc });

    return new FuzzySet({
      mf: complementMFProps,
      universe: Object.assign({}, fs.universe),
    });
  },

  cartesianProduct(fs1, fs2) {
    return mergeSets(fs1, fs2, mergeMFMultiParam.bind(null, Math.min));
  },

  cartesianCoProduct(fs1, fs2) {
    return mergeSets(fs1, fs2, mergeMFMultiParam.bind(null, Math.max));
  },
};

export default fuzzySetOperations;
