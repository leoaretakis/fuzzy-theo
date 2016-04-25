import FuzzySet from './base';
import { defaultNumericUnidimensionalFuzzySetProps as defaultProps } from './constants';

const leftFunction = (x) => Math.max(0.0, Math.sqrt(1.0 - Math.pow(x, 2)));
const rightFunction = (x) => Math.exp(-Math.abs(Math.pow(x, 3)));

class LeftRightFuzzySet extends FuzzySet {
  constructor(c, alpha, beta, props = {}) {
    if (typeof(c) !== 'number'
        || typeof(alpha) !== 'number'
        || typeof(beta) !== 'number') {
      throw new Error('Invalid left-right parameters');
    }

    const cLeft = alpha * Math.sqrt(3.0 / 4.0);
    const cRight = beta * Math.pow(Math.log(2), 1.0 / 3.0);
    const crossover = [
      c + cLeft < c ? c + cLeft : c - cLeft,
      c + cRight > c ? c + cRight : c - cRight,
    ];


    const fsProps = Object.assign({}, defaultProps, props, {
      func: (x) => ((x < c) ? leftFunction((c - x) / alpha) : rightFunction((x - c) / beta)),
      crossoverPoints: crossover,
      bandwidth: Math.abs(crossover[1] - crossover[0]),
    });

    super(fsProps);
  }
}

export default LeftRightFuzzySet;
