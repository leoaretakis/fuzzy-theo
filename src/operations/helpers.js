export function mergeMfProps(...mfs) {
  return {
    dimension: Math.max(...mfs.map((mf) => mf.dimension)),
    convex: mfs.reduce((result, mf) => mf.convex && result, true),
    normal: mfs.reduce((result, mf) => mf.normal && result, true),
    singleton: mfs.reduce((result, mf) => mf.singleton && result, true),
  };
}

export function mergeUniverseProps(...universes) {
  return {
    setType: universes.map((u) => u.setType),
    dataType: universes.map((u) => u.dataType),
    setInterval: universes.map((u) => u.setInterval),
    set: universes.map((u) => u.set),
  };
}

export function mergeMFSingleParam(aggregateFun, ...mfs) {
  return Object.assign(
    mergeMfProps(...mfs),
    { func: (...args) => aggregateFun(...mfs.map((mf) => mf.func(...args))) }
  );
}

export function mergeMFMultiParam(aggregateFun, ...mfs) {
  return Object.assign(
    mergeMfProps(...mfs),
    {
      func: (...params) => {
        let dimensionSum = 0;
        return aggregateFun(...mfs.reduce((prev, mf) => {
          const x = mf.func(...params.slice(dimensionSum));
          dimensionSum += mf.dimension;
          return [...prev, x];
        }, []));
      },
    }
  );
}

export function mergedSetProps(mergeMFFunc, ...sets) {
  return {
    mf: mergeMFFunc(...sets.map((set) => set.mf)),
    universe: mergeUniverseProps(...sets.map((set) => set.universe)),
  };
}
