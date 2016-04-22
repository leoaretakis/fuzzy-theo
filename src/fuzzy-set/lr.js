import FuzzySet from './base';
import { defaultNumericUnidimensionalFuzzySetProps as defaultProps } from './constants';

const leftFunction = (x) => Math.max(0.0, Math.sqrt(1.0 - Math.pow(x, 2)));
const rightFunction = (x) => Math.exp(-Math.abs(Math.pow(x, 3)));

// LEFT: (+ or -) Math.sqrt(1.0 - Math.pow(0.5, 2)) = x;
// RIGHT: (+ or -) Math.pow(-Math.log(0.5), 1.0 / 3.0) = x;

class LeftRightFuzzySet extends FuzzySet {
  constructor(c, alpha, beta, props = { mf: {}, universe: {} }) {
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


    const fsProps = {
      mf: Object.assign({}, defaultProps.mf, props.mf, {
        func: (x) => ((x < c) ? leftFunction((c - x) / alpha) : rightFunction((x - c) / beta)),
        crossoverPoints: crossover,
        bandwidth: Math.abs(crossover[1] - crossover[0]),
      }),
      universe: Object.assign({}, defaultProps.universe, props.universe),
    };

    super(fsProps);
  }
}

export default LeftRightFuzzySet;
