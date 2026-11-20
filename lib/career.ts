// Start of professional work (Hunchha Digital, December 2023). Month is 1-based.
const CAREER_START = { year: 2023, month: 12 };

/**
 * Human wording for how long Rajin has been working, derived from the real
 * start month so it never rounds up early: "over 2 years", "almost 3 years".
 */
export function describeCareerLength(now: Date = new Date()): string {
  const months =
    (now.getFullYear() - CAREER_START.year) * 12 +
    (now.getMonth() + 1 - CAREER_START.month);

  const years = Math.floor(months / 12);
  const remainder = months % 12;

  if (years < 1) return "less than a year";

  const plural = (n: number) => `${n} ${n === 1 ? "year" : "years"}`;
  if (remainder >= 10) return `almost ${plural(years + 1)}`;
  if (remainder <= 1) return plural(years);
  return `over ${plural(years)}`;
}
