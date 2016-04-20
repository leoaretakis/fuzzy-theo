
import FuzzySet from './../fuzzy-set';

export default function complement(fs) {
  const complementFunc = (...args) => 1.0 - fs.mf.func(...args);
  const complementMFProps = Object.assign({}, fs.mf, { func: complementFunc });

  return new FuzzySet({
    mf: complementMFProps,
    universe: Object.assign({}, fs.universe),
  });
}
