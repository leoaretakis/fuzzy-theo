
import FuzzySet from './../fuzzy-set';
import { mergedSetProps, mergeMFMultiParam } from './helpers';

export function cartesianProduct(...fsList) {
  const props = mergedSetProps(mergeMFMultiParam.bind(null, Math.min), ...fsList);
  return new FuzzySet(props);
}

export function cartesianCoProduct(...fsList) {
  const props = mergedSetProps(mergeMFMultiParam.bind(null, Math.max), ...fsList);
  return new FuzzySet(props);
}
