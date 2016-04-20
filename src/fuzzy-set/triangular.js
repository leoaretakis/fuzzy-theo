import FuzzySet from './base';
import { defaultNumericUnidimensionalFuzzySetProps as defaultProps } from './constants';

class TriangularFuzzySet extends FuzzySet {
  constructor(a, b, c, props = { mf: {}, universe: {} }) {
    if (typeof(a) !== 'number'
        || typeof(b) !== 'number'
        || typeof(c) !== 'number'
        || a > b || b > c) {
      throw new Error('Invalid triangle parameters');
    }

    const fsProps = {
      mf: Object.assign({}, defaultProps.mf, props.mf, {
        func: (x) => Math.max(Math.min((x - a) / (b - a), (c - x) / (c - b)), 0.0),
        crossoverPoints: [(a + b) / 2.0, (b + c) / 2.0],
        bandwidth: Math.abs((c - a) / 2.0),
        isSymmetricAroundC: (cParam) => ((b - a) === (c - b)) && cParam === b,
      }),
      universe: Object.assign({}, defaultProps.universe, props.universe),
    };

    super(fsProps);
  }
}

export default TriangularFuzzySet;
