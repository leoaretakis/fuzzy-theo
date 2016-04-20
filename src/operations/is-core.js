import isWithinAlphaLevelCut from './is-alpha-cut';

export default function isSupport(fs, ...x) {
  return isWithinAlphaLevelCut(fs, 1.0, ...x);
}
