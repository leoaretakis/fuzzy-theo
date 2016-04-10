
import MembershipFunction from './membership-function';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

class FuzzySet {
  constructor(membershipFun) {
    if (typeof membershipFun === 'function')
      this.membershipFun = new MembershipFunction(membershipFun);
    else
      this.membershipFun = membershipFun;
  }

  membershipGrade(x) {
    const grade = this.membershipFun.func(x);
    return isNumeric(grade) ? Math.min(Math.max(grade, 0), 1) : 0;
  }
}

export default FuzzySet;
