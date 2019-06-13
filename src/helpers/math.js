export function getPercentage (newVal, oldVal) {
  if (newVal === undefined || newVal === null) return null;
  if (oldVal === 0 || oldVal === null || oldVal === undefined) return null;

  return ((newVal - oldVal) / oldVal) * 100;
}
