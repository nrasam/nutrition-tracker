export function statusColor(p: number) {
  if (p > 100) return "var(--red)";
  if (p >= 75) return "var(--green)";
  if (p >= 40) return "var(--yellow)";
  return "var(--text3)";
}

// If the micro value is a whole number return as is, otherwise round to one decimal point
// Keeps values that should be whole numbers whole numbers
export function formatMicro(n: number) {
  return n % 1 === 0 ? n.toString() : n.toFixed(1);
}
