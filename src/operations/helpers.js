
export function mergeFuzzySetProps(aggregateFun, multiParam, ...sets) {
  const mfFunc = (...args) => aggregateFun(...sets.map((fs) => fs.func(...args)));
  const mfFuncMultiParam = (...args) => {
    let dimensionSum = 0;
    return aggregateFun(...sets.reduce((prev, fs) => {
      const x = fs.func(...args.slice(dimensionSum));
      dimensionSum += fs.dimension;
      return [...prev, x];
    }, []));
  };

  return {
    func: multiParam ? mfFuncMultiParam : mfFunc,
    dimension: Math.max(...sets.map((fs) => fs.dimension)),
    convex: sets.reduce((result, fs) => fs.convex && result, true),
    normal: sets.reduce((result, fs) => fs.normal && result, true),
    singleton: sets.reduce((result, fs) => fs.singleton && result, true),
    setType: sets.map((u) => u.setType),
    dataType: sets.map((u) => u.dataType),
    setInterval: sets.map((u) => u.setInterval),
    set: sets.map((u) => u.set),
  };
}
