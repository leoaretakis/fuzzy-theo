
import { mergeFuzzySetProps } from './helpers';
import FuzzySet from './../fuzzy-set';

export default function intersection(...fsList) {
  return new FuzzySet(mergeFuzzySetProps(Math.min, false, ...fsList));
}
