const invalidCompositionError = 'Utility function not composed by a valid fuzzy set'

const fuzzyUtils = {
  isSupport(x) {
    return this.membershipGrade(x) > 0;
  },

  isCore(x) {
    return this.membershipGrade(x) == 1;
  }
};

for(let funName in fuzzyUtils) {
  let fun = fuzzyUtils[funName];
  if (typeof fun === 'function') {
    fuzzyUtils[funName] = function (x) {
      if (!this.membershipGrade) throw new Error(invalidCompositionError);
      return fun.call(this, x);
    };
  }
}

export default fuzzyUtils;