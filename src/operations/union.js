
import { mergedSetProps, mergeMFSingleParam } from './helpers';
import FuzzySet from './../fuzzy-set';

export default function union(...fsList) {
  const props = mergedSetProps(mergeMFSingleParam.bind(null, Math.max), ...fsList);
  return new FuzzySet(props);
}
