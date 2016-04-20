
import { defaultFuzzySetProps } from './constants';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

class FuzzySet {
  constructor(props) {
    if (!props || !props.mf || !props.mf.func || typeof props.mf.func !== 'function') {
      throw new Error('Fuzzy set properties must have a mf');
    }

    this.mf = Object.assign({}, defaultFuzzySetProps.mf, props.mf);
    this.universe = Object.assign({}, defaultFuzzySetProps.universe, props.universe);
  }

  membershipGrade(...x) {
    const grade = this.mf.func(...x);
    return isNumeric(grade) ? Math.min(Math.max(grade, 0.0), 1.0) : 0.0;
  }
}

export default FuzzySet;
