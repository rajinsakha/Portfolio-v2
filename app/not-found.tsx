import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page Not Found",
  description: "Sorry, the page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
