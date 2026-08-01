import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Post Not Found",
  description: "Sorry, the post you are looking for does not exist.",
};

export default function BlogNotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="font-display text-7xl font-normal mb-4">404</h1>
      <h2 className="font-display text-3xl font-normal mb-6">Post Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, the post you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/blog">View All Posts</Link>
      </Button>
    </div>
  );
}
