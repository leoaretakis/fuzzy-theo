export default function isCrossover(fs, ...x) {
  return fs.membershipGrade(...x) === 0.5;
}
