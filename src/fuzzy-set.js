
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
  constructor(props, universeProps) {
    if (!props || !props.mf) throw new Error('Fuzzy set should properties must have a mf');

    if (props.mf instanceof MembershipFunction) {
      this.membershipFun = props.mf;
    } else {
      const mfProps = (typeof props.mf === 'function') ? { func: props.mf } : props.mf;
      this.membershipFun = new MembershipFunction(mfProps);
    }

    this.universe = Object.assign({}, defaultUniverseProps, universeProps);
  }

  membershipGrade(x) {
    const grade = this.membershipFun.func(x);
    return isNumeric(grade) ? Math.min(Math.max(grade, 0), 1) : 0;
  }
}

export default FuzzySet;
