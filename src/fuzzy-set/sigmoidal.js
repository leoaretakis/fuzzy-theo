import FuzzySet from './base';
import { defaultNumericUnidimensionalFuzzySetProps as defaultProps } from './constants';

class SigmoidalFuzzySet extends FuzzySet {
  constructor(crossoverPoint, slope, props = {}) {
    if (typeof(crossoverPoint) !== 'number'
        || typeof(slope) !== 'number') {
      throw new Error('Invalid sigmoidal parameters');
    }

    const fsProps = Object.assign({}, defaultProps, props, {
      func: (x) => 1 / (1 + Math.exp(-slope * (x - crossoverPoint))),
      crossoverPoints: [crossoverPoint],
      bandwidth: 0,
    });

    super(fsProps);
  }
}

export default SigmoidalFuzzySet;
