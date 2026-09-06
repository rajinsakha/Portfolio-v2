import { cn } from "@/lib/utils";

/**
 * The product surfaces a project was built across — marketing site, web app,
 * admin console, mobile client, backend.
 *
 * Deliberately styled apart from the outline tech badges: those answer "what is
 * it built with", these answer "how much of it was built". Muted mono pills read
 * as metadata rather than competing with the technology list.
 */
export default function ProjectSurfaces({
  surfaces,
  className,
}: {
  surfaces?: string[];
  className?: string;
}) {
  if (!surfaces?.length) return null;

  return (
    <ul
      aria-label="Surfaces built"
      className={cn("flex flex-wrap items-center gap-1.5", className)}
    >
      {surfaces.map((surface) => (
        <li
          key={surface}
          className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
        >
          {surface}
        </li>
      ))}
    </ul>
  );
}
