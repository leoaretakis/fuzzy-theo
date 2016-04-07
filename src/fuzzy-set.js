function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

class FuzzySet {
  constructor(membershipFun) {
    this.membershipFun = membershipFun;
  }

  membershipGrade(x) {
    const grade = this.membershipFun(x);
    return isNumeric(grade) ? Math.min(Math.max(grade, 0), 1) : 0;
  }
}

export default FuzzySet;
