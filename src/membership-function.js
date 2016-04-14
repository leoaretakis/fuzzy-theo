
const defaultMFProps = {
  func: null,
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

class MembershipFunction {
  constructor(properties) {
    if (!properties || !properties.func) {
      throw new Error('Membership function within the properties is mandatory');
    }

    Object.keys(defaultMFProps).forEach((key) => {
      this[key] = Object.prototype.hasOwnProperty.call(properties, key)
        ? properties[key] : defaultMFProps[key];
    });
  }
}

export default MembershipFunction;
