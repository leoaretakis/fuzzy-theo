import FuzzySet from './base';

const triangleFSProps = {
  mf: {
    dimension: 1,
    convex: true,
    normal: true,
    singleton: false,
    crossoverPoints: [], // points where func(x) = 0.5
    isSymmetricAroundC: () => false, // func(x + c) == func(x - c), for all x
    bandwidth: 0, // width Math.abs(x1 - x2), being x1 and x2 the two unique crossover points
    isOpenLeft: false,
    isOpenRight: false,
    isClosed: true,
  },
  universe: {
    setType: 'continuous',
    dataType: 'quantitative',
    setInterval: '(-Infinity, Infinity)',
    set: null,
  },
};

class TriangularFuzzySet extends FuzzySet {
  constructor(a, b, c, props = { mf: {}, universe: {} }) {
    if (a > b || b > c) throw new Error('Invalid triangle parameters');
    const triangFun = (x) => Math.max(Math.min((x - a) / (b - a), (c - x) / (c - b)), 0.0);
    const fsProps = {
      mf: Object.assign({}, triangleFSProps.mf, props.mf, {
        func: triangFun,
        crossoverPoints: [(a + b) / 2.0, (b + c) / 2.0],
        isSymmetricAroundC: (cParam) => ((b - a) === (c - b)) && cParam === b,
      }),
      universe: Object.assign({}, triangleFSProps.universe, props.universe),
    };

    super(fsProps);
  }
}

export default TriangularFuzzySet;
