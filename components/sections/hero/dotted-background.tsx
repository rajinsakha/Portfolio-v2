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
          "pointer-events-none absolute inset-0 -z-10",
          "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]",
          "dark:bg-[radial-gradient(#212121_1px,transparent_1px)]",
          "[background-size:16px_16px]",
          "[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]",
          className,
        )}
      />
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
