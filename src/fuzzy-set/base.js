
import { defaultFuzzySetProps } from './constants';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

class FuzzySet {
  constructor(props) {
    if (!props || !props.func || typeof props.func !== 'function') {
      throw new Error('Fuzzy set properties must have a mf');
    }

    Object.keys(defaultFuzzySetProps).forEach((prop) => {
      this[prop] = props[prop] ? props[prop] : defaultFuzzySetProps[prop];
    });
  }

  membershipGrade(...x) {
    const grade = this.func(...x);
    return isNumeric(grade) ? Math.min(Math.max(grade, 0.0), 1.0) : 0.0;
  }
}

export default FuzzySet;
