import DotGridLayer from "@/components/sections/hero/dot-grid-layer";
import { cn } from "@/lib/utils";

type DottedBackgroundProps = {
  className?: string;
};

export default function DottedBackground({ className }: DottedBackgroundProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "hero-static-dots pointer-events-none absolute inset-0 -z-10",
          // Same tint as the canvas grid's resting dots (16%, see dot-grid.tsx)
          // so the two layers match, and it follows both themes via tokens.
          "bg-[radial-gradient(color-mix(in_oklch,var(--foreground)_16%,var(--background))_1px,transparent_1px)]",
          "[background-size:16px_16px]",
          className,
        )}
      />
      {/* Interactive grid. Renders nothing until it decides the device wants
          it, at which point the static dots above fade out. */}
      <DotGridLayer />

      <div
        aria-hidden="true"
        className="hero-edge-fade pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 -z-10 h-[50vh] w-full bg-gradient-to-b from-primary/5 to-transparent"
      />
    </>
  );
}
