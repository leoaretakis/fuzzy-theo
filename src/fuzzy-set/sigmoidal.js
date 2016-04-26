import FuzzySet from './base';
import { validateNumericParams,
        defaultNumericUnidimensionalFuzzySetProps as defaultProps } from './constants';

class SigmoidalFuzzySet extends FuzzySet {
  constructor(crossoverPoint, slope, props = {}) {
    validateNumericParams('Invalid sigmoidal parameters', crossoverPoint, slope);

    const fsProps = Object.assign({}, defaultProps, props, {
      func: (x) => 1 / (1 + Math.exp(-slope * (x - crossoverPoint))),
      crossoverPoints: [crossoverPoint],
      bandwidth: 0,
    });

    super(fsProps);
  }
}

export default SigmoidalFuzzySet;
