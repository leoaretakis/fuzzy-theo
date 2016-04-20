
import { mergedSetProps, mergeMFSingleParam } from './helpers';
import FuzzySet from './../fuzzy-set';

export default function intersection(...fsList) {
  const props = mergedSetProps(mergeMFSingleParam.bind(null, Math.min), ...fsList);
  return new FuzzySet(props);
}
