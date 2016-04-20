import isWithinStrongAlphaLevelCut from './is-strong-alpha-cut';

export default function isSupport(fs, ...x) {
  return isWithinStrongAlphaLevelCut(fs, 0, ...x);
}
