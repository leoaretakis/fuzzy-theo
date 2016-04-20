import FuzzySet from './base';
import { SetType, DataType } from './constants';

const triangleFSProps = {
  mf: {
    dimension: 1,
    convex: true,
    normal: true,
    singleton: false,
    isOpenLeft: false,
    isOpenRight: false,
    isClosed: true,
  },
  universe: {
    setType: SetType.continuous,
    dataType: DataType.quantitative,
    setInterval: '(-Infinity, Infinity)',
    set: null,
  },
};

class TriangularFuzzySet extends FuzzySet {
  constructor(a, b, c, props = { mf: {}, universe: {} }) {
    if (a > b || b > c) throw new Error('Invalid triangle parameters');

    const fsProps = {
      mf: Object.assign({}, triangleFSProps.mf, props.mf, {
        func: (x) => Math.max(Math.min((x - a) / (b - a), (c - x) / (c - b)), 0.0),
        crossoverPoints: [(a + b) / 2.0, (b + c) / 2.0],
        bandwidth: Math.abs((c - a) / 2.0),
        isSymmetricAroundC: (cParam) => ((b - a) === (c - b)) && cParam === b,
      }),
      universe: Object.assign({}, triangleFSProps.universe, props.universe),
    };

    super(fsProps);
  }
}

export default TriangularFuzzySet;
