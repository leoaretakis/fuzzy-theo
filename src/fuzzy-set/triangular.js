import FuzzySet from './base';
import { validateNumericParams,
        defaultNumericUnidimensionalFuzzySetProps as defaultProps } from './constants';

const invalidParamErrorMsg = 'Invalid triangle parameters';

class TriangularFuzzySet extends FuzzySet {
  constructor(a, b, c, props = {}) {
    validateNumericParams(invalidParamErrorMsg, a, b, c);
    if (a > b || b > c) throw new Error(invalidParamErrorMsg);

    const fsProps = Object.assign({}, defaultProps, props, {
      func: (x) => Math.max(Math.min((x - a) / (b - a), (c - x) / (c - b)), 0.0),
      crossoverPoints: [(a + b) / 2.0, (b + c) / 2.0],
      bandwidth: Math.abs((c - a) / 2.0),
      isSymmetricAroundC: (cParam) => ((b - a) === (c - b)) && cParam === b,
    });

    super(fsProps);
  }
}

export default TriangularFuzzySet;
