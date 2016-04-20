
import { isNumeric } from './utils';

const defaultUniverseProps = {
  setType: null, // continuous, discrete
  dataType: null, // numeric(quantitative), string(qualitative)
  // setInterval: [a,b] (closed), [a,b) (open-right), (a,b] (open-left), (a,b) (open)
  setInterval: null,
  set: null, // [a, c, g ...]
};

const defaultMFProps = {
  func: null,
  dimension: 1, // dimension of the function
  convex: false, // f(a*x1 + (1-a)*x2) >= min(f(x1), f(x2))
  normal: false, // at least one x where this.membershipGrade(x) == 1
  singleton: false, // only one x where f(x) == 1, all the others grades are 0,
  crossoverPoints: [], // points where func(x) = 0.5
  isSymmetricAroundC: () => false, // func(x + c) == func(x - c), for all x
  bandwidth: 0, // width Math.abs(x1 - x2), being x1 and x2 the two unique crossover points
  isOpenLeft: false, // lim fun(x) = 1, when x -> -Infinity
  isOpenRight: false, // lim fun(x) = 1, when x -> +Infinity
  isClosed: false, // lim fun(x) = 0, when x -> -Infinity OR x -> +Infinity
};

class FuzzySet {
  constructor(props) {
    if (!props || !props.mf || !props.mf.func || typeof props.mf.func !== 'function') {
      throw new Error('Fuzzy set properties must have a mf');
    }

    this.mf = Object.assign({}, defaultMFProps, props.mf);
    this.universe = Object.assign({}, defaultUniverseProps, props.universe);
  }

  membershipGrade(...x) {
    const grade = this.mf.func(...x);
    return isNumeric(grade) ? Math.min(Math.max(grade, 0.0), 1.0) : 0.0;
  }
}

export default FuzzySet;
