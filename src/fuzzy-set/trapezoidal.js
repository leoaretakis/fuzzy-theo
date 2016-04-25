import FuzzySet from './base';
import { defaultNumericUnidimensionalFuzzySetProps as defaultProps } from './constants';

class TriangularFuzzySet extends FuzzySet {
  constructor(a, b, c, d, props = {}) {
    if (typeof(a) !== 'number'
        || typeof(b) !== 'number'
        || typeof(c) !== 'number'
        || typeof(d) !== 'number'
        || a > b || b > c || c > d) throw new Error('Invalid trapezoid parameters');

    const fsProps = Object.assign({}, defaultProps, props, {
      func: (x) => Math.max(Math.min((x - a) / (b - a), 1.0, (d - x) / (d - c)), 0.0),
      crossoverPoints: [(a + b) / 2.0, (c + d) / 2.0],
      bandwidth: Math.abs((c + d - a - b) / 2.0),
      isSymmetricAroundC: (cParam) => ((b - a) === (d - c)) && (cParam === ((c + b) / 2.0)),
    });

    super(fsProps);
  }
}

export default TriangularFuzzySet;
