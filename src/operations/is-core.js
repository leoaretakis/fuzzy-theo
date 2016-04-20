import isWithinAlphaLevelCut from './is-alpha-level-cut';

export default function isSupport(fs, ...x) {
  return isWithinAlphaLevelCut(fs, 1.0, ...x);
}
