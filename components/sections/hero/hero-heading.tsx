export default function HeroHeading() {
  return (
    <div>
      <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm sm:text-sm">
        <span
          aria-hidden="true"
          className="size-2 rounded-full bg-emerald-500"
        />
        Available for remote freelance projects
      </p>
      <h1 className="font-display mb-4 text-4xl font-normal tracking-tight md:text-6xl lg:text-7xl">
        Hi, I&apos;m Rajin Sakha
        <span className="text-primary text-shadow-none">.</span>
      </h1>
      <p className="mb-8 font-mono text-xs font-medium uppercase tracking-[0.2em] text-balance text-primary sm:text-sm">
        Full-stack Developer · Remote from Nepal
      </p>
    </div>
  );
}
