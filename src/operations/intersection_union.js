
import { mergeFuzzySetProps } from './helpers';
import FuzzySet from './../fuzzy-set';

export function intersection(...fsList) {
  return new FuzzySet(mergeFuzzySetProps(Math.min, false, ...fsList));
}

export function union(...fsList) {
  return new FuzzySet(mergeFuzzySetProps(Math.max, false, ...fsList));
}
