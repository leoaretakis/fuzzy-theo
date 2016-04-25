
import FuzzySet from './../fuzzy-set';

export default function complement(fs) {
  return new FuzzySet(Object.assign({}, fs,
    { func: (...args) => 1.0 - fs.func(...args) })
  );
}
