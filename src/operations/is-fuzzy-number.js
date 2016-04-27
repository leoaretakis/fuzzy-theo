import { SetType } from './../fuzzy-set/constants';

export default function isFuzzyNumber(fs) {
  return fs.convex && fs.normal && fs.setType === SetType.continuous;
}
