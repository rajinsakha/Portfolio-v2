/**
 * Formats a `YYYY-MM-DD` frontmatter date for display.
 *
 * The date is forced to UTC so a reader east or west of the author never sees
 * the published date shift by a day.
 */
export function formatPostDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
