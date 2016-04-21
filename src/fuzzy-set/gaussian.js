import FuzzySet from './base';
import { defaultNumericUnidimensionalFuzzySetProps as defaultProps } from './constants';

class GaussianFuzzySet extends FuzzySet {
  constructor(mean, variance, props = { mf: {}, universe: {} }) {
    if (typeof(mean) !== 'number'
        || typeof(variance) !== 'number') {
      throw new Error('Invalid gaussian parameters');
    }

    const temp = variance * Math.sqrt(2 * Math.log(2));
    const fsProps = {
      mf: Object.assign({}, defaultProps.mf, props.mf, {
        func: (x) => Math.exp(-0.5 * Math.pow((x - mean) / variance, 2)),
        crossoverPoints: [mean - temp, mean + temp],
        bandwidth: Math.abs(2 * temp),
        isSymmetricAroundC: (cParam) => cParam === mean,
      }),
      universe: Object.assign({}, defaultProps.universe, props.universe),
    };

    super(fsProps);
  }
}

export default GaussianFuzzySet;
