
import { mergeFuzzySetProps } from './helpers';
import FuzzySet from './../fuzzy-set';

export default function union(...fsList) {
  return new FuzzySet(mergeFuzzySetProps(Math.max, false, ...fsList));
}
