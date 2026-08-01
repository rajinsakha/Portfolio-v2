import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import BlogPostCard from "@/components/ui/blog-post-card";
import { getAllPosts } from "@/lib/blog";

const HOMEPAGE_POST_COUNT = 3;

export default function Writing() {
  // Newest three, with featured posts leading within that selection.
  const posts = getAllPosts()
    .slice(0, HOMEPAGE_POST_COUNT)
    .sort((a, b) => Number(b.featured) - Number(a.featured));

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="py-16 md:py-24" aria-labelledby="writing-heading">
      <div className="container">
        <SectionHeading
          id="writing-heading"
          title="Writing"
          subtitle="Notes from production work"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/blog">
              Read All Posts <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
