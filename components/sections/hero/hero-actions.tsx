import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HeroActions() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Button size="lg" asChild>
        <Link href="#projects">
          View My Work <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button size="lg" variant="outline" asChild>
        <Link href="#contact">Contact Me</Link>
      </Button>
    </div>
  );
}
