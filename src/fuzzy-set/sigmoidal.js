import FuzzySet from './base';
import { defaultNumericUnidimensionalFuzzySetProps as defaultProps } from './constants';

class SigmoidalFuzzySet extends FuzzySet {
  constructor(crossoverPoint, slope, props = { mf: {}, universe: {} }) {
    if (typeof(crossoverPoint) !== 'number'
        || typeof(slope) !== 'number') {
      throw new Error('Invalid sigmoidal parameters');
    }

    const fsProps = {
      mf: Object.assign({}, defaultProps.mf, props.mf, {
        func: (x) => 1 / (1 + Math.exp(-slope * (x - crossoverPoint))),
        crossoverPoints: [crossoverPoint],
        bandwidth: 0,
      }),
      universe: Object.assign({}, defaultProps.universe, props.universe),
    };

    super(fsProps);
  }
}

export default SigmoidalFuzzySet;
