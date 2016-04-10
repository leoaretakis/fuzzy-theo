
const defaultUniverseProperties = {
  set_type: Symbol('continuous'), // continuous, discrete
  data_type: Symbol('numeric'), // numeric(quantitative), string(qualitative)
  set_interval: '(-Infinity, Infinity)', // [a,b] (closed), [a,b) (open-right), (a,b] (open-left), (a,b) (open)
  set: null, // [a, c, g ...]
};

const defaultMembershipFunctionProperties = {
  convex: false, // f(a*x1 + (1-a)*x2) >= min(f(x1), f(x2))
  normal: false, // at least one x where this.membershipGrade(x) == 1
  singleton: false, // only one x where f(x) == 1, all the others grades are 0

};

class MembershipFunction {
  constructor(func, properties, universeProperties) {
    this.func = func;
    this.universeProperties = Object.assign({}, universeProperties);
    this.universeProperties = Object.assign(this.universeProperties, defaultUniverseProperties);
  }
}

export default MembershipFunction;
