export default function isWithinStrongAlphaLevelCut(fs, alpha, ...x) {
  return fs.membershipGrade(...x) > alpha;
}
