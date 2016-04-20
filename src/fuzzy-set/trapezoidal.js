import FuzzySet from './base';
import { defaultNumericUnidimensionalFuzzySetProps as defaultProps } from './constants';

class TriangularFuzzySet extends FuzzySet {
  constructor(a, b, c, d, props = { mf: {}, universe: {} }) {
    if (a > b || b > c || c > d) throw new Error('Invalid trapezoid parameters');

    const fsProps = {
      mf: Object.assign({}, defaultProps.mf, props.mf, {
        func: (x) => Math.max(Math.min((x - a) / (b - a), 1.0, (d - x) / (d - c)), 0.0),
        crossoverPoints: [(a + b) / 2.0, (c + d) / 2.0],
        bandwidth: Math.abs((c + d - a - b) / 2.0),
        isSymmetricAroundC: (cParam) => ((b - a) === (d - c)) && (cParam === ((c - b) / 2.0)),
      }),
      universe: Object.assign({}, defaultProps.universe, props.universe),
    };

    super(fsProps);
  }
}

export default TriangularFuzzySet;
