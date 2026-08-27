import Image from "next/image";

import { cn } from "@/lib/utils";

export default function TechLogo({
  name,
  icon,
  invertInDark = false,
}: {
  name: string;
  icon: string;
  /**
   * Single-colour black marks (Expo) vanish against the dark card. next/image
   * renders an <img>, so the SVG's own fills can't inherit currentColor — but a
   * CSS filter does apply to the element, which flips black to white in dark mode.
   */
  invertInDark?: boolean;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src={icon || "/placeholder.svg"}
        alt={`${name} logo`}
        fill
        className={cn("object-contain", invertInDark && "dark:invert")}
        sizes="40px"
      />
    </div>
  );
}
