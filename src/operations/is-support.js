import isWithinStrongAlphaLevelCut from './is-strong-alpha-level-cut';

export default function isSupport(fs, ...x) {
  return isWithinStrongAlphaLevelCut(fs, 0, ...x);
}
