
import MembershipFunction from './membership-function';
import { isNumeric } from './utils';

const defaultUniverseProps = {
  setType: null, // continuous, discrete
  dataType: null, // numeric(quantitative), string(qualitative)
  // setInterval: [a,b] (closed), [a,b) (open-right), (a,b] (open-left), (a,b) (open)
  setInterval: null,
  set: null, // [a, c, g ...]
};

class FuzzySet {
  constructor(props) {
    if (!props || !props.mf) throw new Error('Fuzzy set should properties must have a mf');
    this.mf = (props.mf instanceof MembershipFunction)
      ? props.mf
    : new MembershipFunction(props.mf);
    this.universe = Object.assign({}, defaultUniverseProps, props.universe);
  }

  membershipGrade(x) {
    const grade = this.mf.func(x);
    return isNumeric(grade) ? Math.min(Math.max(grade, 0), 1) : 0;
  }
}

export default FuzzySet;
