import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * A technology label, optionally with its brand mark.
 *
 * The mark is inlined rather than loaded through next/image so its path can
 * take `fill="currentColor"` and follow the badge's own text colour in both
 * themes. Badge already styles a direct `svg` child (`[&>svg]:size-3`, `gap-1`),
 * so the icon needs no sizing of its own.
 *
 * `iconPath` comes from `resolveTechIcons`, which returns nothing for
 * technologies without a recognised mark and for repeats of a mark already used
 * in the same list. Both cases render as text alone.
 */
export function TechBadge({
  tech,
  iconPath,
  className,
}: {
  tech: string;
  iconPath?: string;
  className?: string;
}) {
  return (
    <Badge variant="outline" className={cn("text-xs", className)}>
      {iconPath ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d={iconPath} fill="currentColor" />
        </svg>
      ) : null}
      {tech}
    </Badge>
  );
}
