export default function isWithinAlphaLevelCut(fs, alpha, ...x) {
  return fs.membershipGrade(...x) >= alpha;
}
