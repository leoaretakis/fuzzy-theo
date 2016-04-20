export const SetType = {
  continuous: Symbol('continuous'),
  discrete: Symbol('discrete'),
};

export const DataType = {
  quantitative: Symbol('quantitative'),
  qualitative: Symbol('qualitative'),
};

export const defaultNumericUnidimensionalFuzzySetProps = {
  mf: {
    dimension: 1,
    convex: true,
    normal: true,
    singleton: false,
    isOpenLeft: false,
    isOpenRight: false,
    isClosed: true,
  },
  universe: {
    setType: SetType.continuous,
    dataType: DataType.quantitative,
    setInterval: '(-Infinity, Infinity)',
    set: null,
  },
};

export const defaultFuzzySetProps = {
  universe: {
    setType: null, // continuous, discrete
    dataType: null, // numeric(quantitative), string(qualitative)
    // setInterval: [a,b] (closed), [a,b) (open-right), (a,b] (open-left), (a,b) (open)
    setInterval: null,
    set: null, // [a, c, g ...]
  },
  mf: {
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
  },
};
