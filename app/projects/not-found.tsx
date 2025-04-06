import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Project Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, the project you are looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Button asChild>
        <Link href="/#projects">View All Projects</Link>
      </Button>
    </div>
  );
}
