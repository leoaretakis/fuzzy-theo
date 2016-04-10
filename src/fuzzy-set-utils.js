const invalidCompositionError = 'Utility function not composed by a valid fuzzy set';

const fuzzyUtils = {
  isSupport(x) {
    return this.isWithinStrongAlphaLevelCut(x, 0);
  },

  isCore(x) {
    return this.isWithinAlphaLevelCut(x, 1);
  },

  isCrossover(x) {
    return this.membershipGrade(x) === 0.5;
  },

  isWithinAlphaLevelCut(x, alpha) {
    return this.membershipGrade(x) >= alpha;
  },

  isWithinStrongAlphaLevelCut(x, alpha) {
    return this.membershipGrade(x) > alpha;
  },
};

for (const funName in fuzzyUtils) {
  if ({}.hasOwnProperty.call(fuzzyUtils, funName) && typeof fuzzyUtils[funName] === 'function') {
    const fun = fuzzyUtils[funName];

    fuzzyUtils[funName] = function wrapper(...args) {
      if (!this.membershipGrade) throw new Error(invalidCompositionError);
      return fun.apply(this, args);
    };
  }
}

export default fuzzyUtils;
