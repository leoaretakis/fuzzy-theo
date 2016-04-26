import FuzzySet from './base';
import { validateNumericParams,
        defaultNumericUnidimensionalFuzzySetProps as defaultProps } from './constants';

class BellFuzzySet extends FuzzySet {
  constructor(mean, span, variance, props = {}) {
    validateNumericParams('Invalid bell parameters', mean, variance, span);

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
