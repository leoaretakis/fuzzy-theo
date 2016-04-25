import FuzzySet from './base';
import { defaultNumericUnidimensionalFuzzySetProps as defaultProps } from './constants';

class BellFuzzySet extends FuzzySet {
  constructor(mean, span, variance, props = {}) {
    if (typeof(mean) !== 'number'
        || typeof(variance) !== 'number'
        || typeof(span) !== 'number') {
      throw new Error('Invalid bell parameters');
    }

    const temp = Math.pow(1, - (2 * span)) * variance;
    const fsProps = Object.assign({}, defaultProps, props, {
      func: (x) => 1 / (1 + Math.abs(Math.pow((x - mean) / variance, 2 * span))),
      crossoverPoints: [mean - temp, mean + temp],
      bandwidth: Math.abs(2 * temp),
      isSymmetricAroundC: (cParam) => cParam === mean,
    });

    super(fsProps);
  }
}

export default BellFuzzySet;
