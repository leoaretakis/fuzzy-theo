import FuzzySet from './base';
import { validateNumericParams,
        defaultNumericUnidimensionalFuzzySetProps as defaultProps } from './constants';

class GaussianFuzzySet extends FuzzySet {
  constructor(mean, variance, props = {}) {
    validateNumericParams('Invalid gaussian parameters', mean, variance);

    const temp = variance * Math.sqrt(2 * Math.log(2));
    const fsProps = Object.assign({}, defaultProps, props, {
      func: (x) => Math.exp(-0.5 * Math.pow((x - mean) / variance, 2)),
      crossoverPoints: [mean - temp, mean + temp],
      bandwidth: Math.abs(2 * temp),
      isSymmetricAroundC: (cParam) => cParam === mean,
    });

    super(fsProps);
  }
}

export default GaussianFuzzySet;
