
import FuzzySet from './../fuzzy-set';
import { mergeFuzzySetProps } from './helpers';

export function cartesianProduct(...fsList) {
  const props = mergeFuzzySetProps(Math.min, true, ...fsList);
  return new FuzzySet(props);
}

export function cartesianCoProduct(...fsList) {
  const props = mergeFuzzySetProps(Math.max, true, ...fsList);
  return new FuzzySet(props);
}
